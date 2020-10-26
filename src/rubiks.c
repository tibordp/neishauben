#include <emscripten.h>
#include <limits.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

typedef struct var {
  char sides[6][9];
  char system;
} cube;

// TOP-right    RIGHT-bottom  BOTTOM-left   LEFT-top
/*
 TRANSFORMATIONS FOR
  D   0..5 = F,B,U,D,L,R
  B   0..3 = top, right,
 LUR         bottom, left
  F  layout
*/
char cube_transform[6][4][4] = {
    {{2, 5, 2, 2}, {5, 3, 2, 0}, {3, 4, 0, 2}, {4, 2, 2, 2}},
    {{3, 5, 2, 0}, {5, 2, 0, 0}, {2, 4, 0, 0}, {4, 3, 0, 2}},
    {{1, 5, 2, 3}, {5, 0, 3, 0}, {0, 4, 0, 1}, {4, 1, 1, 2}},
    {{0, 5, 2, 1}, {5, 1, 1, 0}, {1, 4, 0, 3}, {4, 0, 3, 2}},
    {{1, 2, 3, 3}, {2, 0, 3, 3}, {0, 3, 3, 3}, {3, 1, 3, 3}},
    {{1, 3, 1, 1}, {3, 0, 1, 1}, {0, 2, 1, 1}, {2, 1, 1, 1}}};

char halfturn_transform[6][2][4];
char directions_transform[6][6];
char double_directions_transform[6][6][6];

char edge_transform[4] = {1, 5, 7, 3}; // TOP, RIGHT, BOTTOM, LEFT
char corner_transform[4][4] = {
    {-1, 2, -1, 0}, {2, -1, 8, -1}, {-1, 8, -1, 6}, {0, -1, 6, -1}};

char sp_case_sides[8][4][2] = {
    {{0, 0}, {0, 0}, {0, 0}, {0, 0}}, {{0, 0}, {0, 0}, {1, 1}, {0, 0}},
    {{0, 0}, {0, 1}, {0, 0}, {1, 0}}, {{0, 0}, {1, 1}, {0, 0}, {1, 1}},
    {{1, 1}, {0, 1}, {0, 0}, {1, 0}}, {{1, 0}, {0, 1}, {0, 0}, {0, 0}},
    {{0, 1}, {0, 0}, {0, 1}, {0, 1}}, {{1, 0}, {0, 0}, {1, 0}, {1, 0}}};
char sp_corner_transform[4] = {0, 2, 8, 6};

#define cube_inverse(x) (((x / 2) * 2) - (x % 2) + 1)

int record_algorithm[1024];
int record_count = 0;

void cube_init() {
  int x, y;
  for (x = 0; x < 6; x++) {
    for (y = 0; y < 4; y++) {
      halfturn_transform[x][0][y] = cube_transform[x][(y % 2) * 2][(y / 2) * 2];
      halfturn_transform[x][1][y] =
          cube_transform[x][1 + (y % 2) * 2][(y / 2) * 2];
      directions_transform[x][cube_transform[x][y][0]] =
          cube_transform[x][y][2];
      double_directions_transform[cube_transform[x][y][0]]
                                 [cube_transform[x][y][1]][x] = y;
    }
    directions_transform[x][x] = -1;               // same
    directions_transform[x][cube_inverse(x)] = -2; // across
  }
}

void cube_default(cube *src) {
  int cnt, cnt2;
  for (cnt = 0; cnt < 6; cnt++) {
    for (cnt2 = 0; cnt2 < 9; cnt2++) {
      (*src).sides[cnt][cnt2] = cnt;
    }
  }
}

void cube_perform_swap_edges(char *src, char *dst, int dir1, int dir2) {
  int line[3];

  if (dir1 == 0) {
    line[0] = src[0];
    line[1] = src[1];
    line[2] = src[2];
  }
  if (dir1 == 1) {
    line[0] = src[2];
    line[1] = src[5];
    line[2] = src[8];
  }
  if (dir1 == 2) {
    line[0] = src[8];
    line[1] = src[7];
    line[2] = src[6];
  }
  if (dir1 == 3) {
    line[0] = src[6];
    line[1] = src[3];
    line[2] = src[0];
  }

  if (dir2 == 0) {
    dst[0] = line[0];
    dst[1] = line[1];
    dst[2] = line[2];
  }
  if (dir2 == 1) {
    dst[2] = line[0];
    dst[5] = line[1];
    dst[8] = line[2];
  }
  if (dir2 == 2) {
    dst[8] = line[0];
    dst[7] = line[1];
    dst[6] = line[2];
  }
  if (dir2 == 3) {
    dst[6] = line[0];
    dst[3] = line[1];
    dst[0] = line[2];
  }
}

void cube_perform_swap_middles(char *src, char *dst, int dir1, int dir2) {
  int line[2];

  dst[4] = src[4];

  if (dir1 == 0) {
    line[0] = src[3];
    line[1] = src[5];
  }
  if (dir1 == 1) {
    line[0] = src[1];
    line[1] = src[7];
  }
  if (dir1 == 2) {
    line[0] = src[5];
    line[1] = src[3];
  }
  if (dir1 == 3) {
    line[0] = src[7];
    line[1] = src[1];
  }

  if (dir2 == 0) {
    dst[3] = line[0];
    dst[5] = line[1];
  }
  if (dir2 == 1) {
    dst[1] = line[0];
    dst[7] = line[1];
  }
  if (dir2 == 2) {
    dst[5] = line[0];
    dst[3] = line[1];
  }
  if (dir2 == 3) {
    dst[7] = line[0];
    dst[1] = line[1];
  }
}

void cube_perform_rotate(char *arry, int mode) {
  /* 0: clockwise
  1: counter-clockwise
  2: double
  */
  int cnt;
  int tmp[9];
  for (cnt = 0; cnt < 9; cnt++) {
    tmp[cnt] = arry[cnt];
  }
  if (mode == 0) {
    arry[0] = tmp[6];
    arry[1] = tmp[3];
    arry[2] = tmp[0];
    arry[3] = tmp[7];
    arry[5] = tmp[1];
    arry[6] = tmp[8];
    arry[7] = tmp[5];
    arry[8] = tmp[2];
  }
  if (mode == 1) {
    arry[0] = tmp[2];
    arry[1] = tmp[5];
    arry[2] = tmp[8];
    arry[3] = tmp[1];
    arry[5] = tmp[7];
    arry[6] = tmp[0];
    arry[7] = tmp[3];
    arry[8] = tmp[6];
  }
  if (mode == 2) {
    arry[0] = tmp[8];
    arry[1] = tmp[7];
    arry[2] = tmp[6];
    arry[3] = tmp[5];
    arry[5] = tmp[3];
    arry[6] = tmp[2];
    arry[7] = tmp[1];
    arry[8] = tmp[0];
  }
}

void cube_perform_copy_face(cube *src_c, cube *dst_c, int s_side, int d_side) {
  int cnt;
  for (cnt = 0; cnt < 9; cnt++) {
    (*dst_c).sides[d_side][cnt] = (*src_c).sides[s_side][cnt];
  }
}

void cube_perform_rotate_cube(cube *src, int dir) {
  cube temp = *src;
  if (dir == 0) {
    cube_perform_rotate((*src).sides[0], 0);
    cube_perform_rotate((*src).sides[1], 1);
    cube_perform_copy_face(&temp, src, 2, 5);
    cube_perform_copy_face(&temp, src, 5, 3);
    cube_perform_copy_face(&temp, src, 3, 4);
    cube_perform_copy_face(&temp, src, 4, 2);
    cube_perform_rotate((*src).sides[3], 2);
    cube_perform_rotate((*src).sides[4], 2);
  }
  if (dir == 1) {
    cube_perform_rotate((*src).sides[1], 0);
    cube_perform_rotate((*src).sides[0], 1);
    cube_perform_copy_face(&temp, src, 2, 4);
    cube_perform_copy_face(&temp, src, 4, 3);
    cube_perform_copy_face(&temp, src, 3, 5);
    cube_perform_copy_face(&temp, src, 5, 2);
    cube_perform_rotate((*src).sides[5], 2);
    cube_perform_rotate((*src).sides[3], 2);
  }
  if (dir == 2) {
    cube_perform_rotate((*src).sides[2], 0);
    cube_perform_rotate((*src).sides[3], 1);
    cube_perform_copy_face(&temp, src, 0, 4);
    cube_perform_copy_face(&temp, src, 4, 1);
    cube_perform_copy_face(&temp, src, 1, 5);
    cube_perform_copy_face(&temp, src, 5, 0);
    cube_perform_rotate((*src).sides[0], 0);
    cube_perform_rotate((*src).sides[1], 0);
    cube_perform_rotate((*src).sides[4], 0);
    cube_perform_rotate((*src).sides[5], 0);
  }
  if (dir == 3) {
    cube_perform_rotate((*src).sides[3], 0);
    cube_perform_rotate((*src).sides[2], 1);
    cube_perform_copy_face(&temp, src, 0, 5);
    cube_perform_copy_face(&temp, src, 5, 1);
    cube_perform_copy_face(&temp, src, 1, 4);
    cube_perform_copy_face(&temp, src, 4, 0);
    cube_perform_rotate((*src).sides[0], 1);
    cube_perform_rotate((*src).sides[1], 1);
    cube_perform_rotate((*src).sides[4], 1);
    cube_perform_rotate((*src).sides[5], 1);
  }
  if (dir == 4) {
    cube_perform_rotate((*src).sides[4], 0);
    cube_perform_rotate((*src).sides[5], 1);
    cube_perform_copy_face(&temp, src, 0, 3);
    cube_perform_copy_face(&temp, src, 3, 1);
    cube_perform_copy_face(&temp, src, 1, 2);
    cube_perform_copy_face(&temp, src, 2, 0);
  }
  if (dir == 5) {
    cube_perform_rotate((*src).sides[5], 0);
    cube_perform_rotate((*src).sides[4], 1);
    cube_perform_copy_face(&temp, src, 0, 2);
    cube_perform_copy_face(&temp, src, 2, 1);
    cube_perform_copy_face(&temp, src, 1, 3);
    cube_perform_copy_face(&temp, src, 3, 0);
  }
}

void cube_perform(cube *src_c, int operation) {
  cube cube_copy = *src_c;

  int cnt;
  if (operation < 0) {
    return;
  }
  if (operation < 12) {
    cube_perform_rotate((*src_c).sides[operation / 2], operation % 2);
    for (cnt = 0; cnt < 4; cnt++) {
      cube_perform_swap_edges(
          cube_copy.sides[cube_transform[operation / 2][cnt][operation % 2]],
          (*src_c)
              .sides[cube_transform[operation / 2][cnt][1 - (operation % 2)]],
          cube_transform[operation / 2][cnt][2 + (operation % 2)],
          cube_transform[operation / 2][cnt][3 - (operation % 2)]);
    }
  }
  if ((operation < 24) && (operation > 11)) {
    int face_num = operation - 12;
    cube_perform_rotate((*src_c).sides[face_num / 2], face_num % 2);
    for (cnt = 0; cnt < 4; cnt++) {
      cube_perform_swap_edges(
          cube_copy.sides[cube_transform[face_num / 2][cnt][face_num % 2]],
          (*src_c).sides[cube_transform[face_num / 2][cnt][1 - (face_num % 2)]],
          cube_transform[face_num / 2][cnt][2 + (face_num % 2)],
          cube_transform[face_num / 2][cnt][3 - (face_num % 2)]);
      cube_perform_swap_middles(
          cube_copy.sides[cube_transform[face_num / 2][cnt][face_num % 2]],
          (*src_c).sides[cube_transform[face_num / 2][cnt][1 - (face_num % 2)]],
          cube_transform[face_num / 2][cnt][2 + (face_num % 2)],
          cube_transform[face_num / 2][cnt][3 - (face_num % 2)]);
    }
  }
  if ((operation < 30) && (operation > 23)) {
    int face_num = operation - 24;
    cube_perform_rotate((*src_c).sides[face_num], 2);
    for (cnt = 0; cnt < 4; cnt++) {
      cube_perform_swap_edges(
          cube_copy.sides[halfturn_transform[face_num][cnt / 2][cnt % 2]],
          (*src_c).sides[halfturn_transform[face_num][cnt / 2][1 - (cnt % 2)]],
          halfturn_transform[face_num][cnt / 2][2 + (cnt % 2)],
          halfturn_transform[face_num][cnt / 2][3 - (cnt % 2)]);
    }
  }

  if ((operation < 36) && (operation > 29)) {
    cube_perform_rotate_cube(src_c, operation - 30);
  }

  if ((operation < 42) && (operation > 35)) {
    int face_num = operation - 36;
    for (cnt = 0; cnt < 4; cnt++) {
      cube_perform_swap_middles(
          cube_copy.sides[cube_transform[face_num][cnt][0]],
          (*src_c).sides[cube_transform[face_num][cnt][1]],
          cube_transform[face_num][cnt][2], cube_transform[face_num][cnt][3]);
    }
  }

  if ((operation < 45) && (operation > 41)) {
    int face_num = operation - 42;
    for (cnt = 0; cnt < 4; cnt++) {
      cube_perform_swap_middles(
          cube_copy.sides[halfturn_transform[face_num * 2][cnt / 2][cnt % 2]],
          (*src_c)
              .sides[halfturn_transform[face_num * 2][cnt / 2][1 - (cnt % 2)]],
          halfturn_transform[face_num * 2][cnt / 2][2 + (cnt % 2)],
          halfturn_transform[face_num * 2][cnt / 2][3 - (cnt % 2)]);
    }
  }
  if ((operation < 48) && (operation > 44)) {
    cube_perform_rotate_cube(src_c, (operation - 45) * 2);
    cube_perform_rotate_cube(src_c, (operation - 45) * 2);
  }
}

void cube_find_center(cube *source, int color, int *face) {
  int cnt;
  *face = -1;
  for (cnt = 0; cnt < 6; cnt++) {
    if (color == (*source).sides[cnt][4]) {
      *face = cnt;
    }
  }
}

void cube_find_edge(cube *source, int color1, int color2, int *face1,
                    int *face2) {
  int cnt, cnt1, sid2, dir2;
  int bk_var = 0;
  *face1 = -1;
  *face2 = -1;
  if (color1 / 2 == color2 / 2) {
    return;
  }
  for (cnt = 0; cnt < 6; cnt++) {
    for (cnt1 = 0; cnt1 < 4; cnt1++) {
      sid2 = cube_transform[cnt][cnt1][0];
      dir2 = cube_transform[cnt][cnt1][2];
      if ((color1 == (*source).sides[cnt][edge_transform[cnt1]]) &&
          (color2 == (*source).sides[sid2][edge_transform[dir2]])) {
        *face1 = cnt;
        *face2 = sid2;
        bk_var = 1;
        break;
      }
    }
    if (bk_var) {
      break;
    }
  }
}

void cube_get_edge(cube *source, int face1, int face2, int *color1,
                   int *color2) {
  *color1 =
      (*source)
          .sides[face1][edge_transform[directions_transform[face2][face1]]];
  *color2 =
      (*source)
          .sides[face2][edge_transform[directions_transform[face1][face2]]];
}

void cube_get_corner(cube *source, int face1, int face2, int face3, int *color1,
                     int *color2, int *color3) {
  *color1 =
      (*source)
          .sides[face1][corner_transform[directions_transform[face2][face1]]
                                        [directions_transform[face3][face1]]];
  *color2 =
      (*source)
          .sides[face2][corner_transform[directions_transform[face1][face2]]
                                        [directions_transform[face3][face2]]];
  *color3 =
      (*source)
          .sides[face3][corner_transform[directions_transform[face1][face3]]
                                        [directions_transform[face2][face3]]];
}

void cube_find_corner(cube *source, int color1, int color2, int color3,
                      int *face1, int *face2, int *face3) {
  int cnt, cnt1, cnt2, sid2, sid3, dir2, dir3, d2_3, d3_2;
  int bk_var = 0;
  *face1 = -1;
  *face2 = -1;
  *face3 = -1;
  if ((color1 / 2 == color2 / 2) || (color2 / 2 == color3 / 2) ||
      (color1 / 2 == color3 / 2)) {
    return;
  }
  for (cnt = 0; cnt < 6; cnt++) {
    for (cnt1 = 0; cnt1 < 4; cnt1++) {
      for (cnt2 = 0; cnt2 < 2; cnt2++) {
        sid2 = cube_transform[cnt][cnt1][0];
        dir2 = cube_transform[cnt][cnt1][2];
        sid3 = cube_transform[cnt][(cnt1 + cnt2 * 2 + 1) % 4][0];
        dir3 = cube_transform[cnt][(cnt1 + cnt2 * 2 + 1) % 4][2];
        d2_3 = directions_transform[sid3][sid2];
        d3_2 = directions_transform[sid2][sid3];
        if ((color1 ==
             (*source)
                 .sides[cnt]
                       [corner_transform[cnt1][(cnt1 + cnt2 * 2 + 1) % 4]]) &&
            (color2 == (*source).sides[sid2][corner_transform[dir2][d2_3]]) &&
            (color3 == (*source).sides[sid3][corner_transform[dir3][d3_2]])) {
          *face1 = cnt;
          *face2 = sid2;
          *face3 = sid3;
          bk_var = 1;
          break;
        }
      }
      if (bk_var) {
        break;
      }
    }
    if (bk_var) {
      break;
    }
  }
}

int cube_layer(cube *source, // default 2
               int face1, int face2, int face3) {
  if ((face1 == (*source).system) || (face2 == (*source).system) ||
      (face3 == (*source).system)) {
    return 0;
  } else if ((face1 == cube_inverse((*source).system)) ||
             (face2 == cube_inverse((*source).system)) ||
             (face3 == cube_inverse((*source).system))) {
    return 2;
  } else {
    return 1;
  }
}

int sp_perform(cube *ins, int oper) {
  static int c_dcount = 0;
  int c_dcount_l = c_dcount;
  if (oper != -1) {
    cube_perform(ins, oper);
    record_algorithm[record_count++] = oper;
    c_dcount++;
  } else {
    c_dcount = 0;
  }
  return c_dcount_l;
}

int cube_solved(cube *source) {
  int cnt1, cnt2;
  for (cnt1 = 0; cnt1 < 6; cnt1++) {
    for (cnt2 = 0; cnt2 < 9; cnt2++) {
      if ((*source).sides[cnt1][cnt2] != (*source).sides[cnt1][4]) {
        return 0;
      }
    }
  }
  return 1;
}

void cube_fl_cross_rotate_corner(cube *src, int sig_color, int dir) {
  sp_perform(src, sig_color * 2);
  sp_perform(src, (*src).system * 2 + 1);
  sp_perform(src, cube_transform[(*src).system][(dir + 3) % 4][0] * 2);
  sp_perform(src, (*src).system * 2);
}

int cube_fl_cross_align_diff(int system, int sig_color, int sig_face) {
  char w_dir = directions_transform[sig_color][system];
  char i_dir = directions_transform[sig_face][system];
  if ((w_dir - i_dir) < 0) {
    return (w_dir - i_dir + 4);
  } else {
    return w_dir - i_dir;
  }
}

void cube_fl_cross_simple_align(cube *src, int sig_color, int sig_face,
                                int mode) // 0 = normal, 1 = down
{                                         // 2 = unalign
  int diff = cube_fl_cross_align_diff((*src).system, sig_color, sig_face);
  if (mode == 1) {
    if (diff == 1) {
      sp_perform(src, cube_inverse((*src).system) * 2 + 1);
    }
    if (diff == 2) {
      sp_perform(src, cube_inverse((*src).system) + 24);
    }
    if (diff == 3) {
      sp_perform(src, cube_inverse((*src).system) * 2);
    }
  } else if (mode == 2) {
    if (diff == 1) {
      sp_perform(src, ((*src).system * 2) + 1);
    }
    if (diff == 2) {
      sp_perform(src, (*src).system + 24);
    }
    if (diff == 3) {
      sp_perform(src, ((*src).system * 2));
    }
  } else {
    if (diff == 1) {
      sp_perform(src, ((*src).system * 2));
    }
    if (diff == 2) {
      sp_perform(src, (*src).system + 24);
    }
    if (diff == 3) {
      sp_perform(src, ((*src).system * 2) + 1);
    }
  }
}

void cube_fl_cross_full_align(cube *src, int sig_color, int sig_face) {
  int diff = cube_fl_cross_align_diff((*src).system, sig_color, sig_face);
  if (diff == 0) {
    return;
  }
  sp_perform(src, 24 + sig_face);
  cube_fl_cross_simple_align(src, sig_color, sig_face, 1);
  int to_turn =
      cube_transform[(*src).system]
                    [(directions_transform[sig_face][(*src).system] + diff) % 4]
                    [0];
  sp_perform(src, 24 + to_turn);
}

int cube_fl_cross(cube *source) {
  int f1, s_sig_face, layer;
  int st_col = (*source).system;
  int cnt, diff, to_turn, s_sig_color;
  for (cnt = 0; cnt < 4; cnt++) {
    s_sig_color = cube_transform[st_col][cnt][0];
    cube_find_edge(source, st_col, s_sig_color, &f1, &s_sig_face);

    layer = cube_layer(source, f1, s_sig_face, -1);
    if (layer == 0) {
      if (f1 == (*source).system) {
        if (cnt == 0) {
          cube_fl_cross_simple_align(source, s_sig_color, s_sig_face, 0);
        } else {
          cube_fl_cross_full_align(source, s_sig_color, s_sig_face);
        }
      } else {
        if (cnt == 0) {
          sp_perform(source, f1 * 2);
          sp_perform(
              source,
              (cube_transform[st_col]
                             [(directions_transform[f1][st_col] + 3) % 4][0]) *
                  2);
          cube_fl_cross_simple_align(
              source, s_sig_color,
              cube_transform[st_col][(directions_transform[f1][st_col] + 3) % 4]
                            [0],
              0);
        } else {
          cube_fl_cross_full_align(source, s_sig_color, f1);
          cube_fl_cross_rotate_corner(source, s_sig_color, cnt);
        }
      }
    } else if (layer == 2) {
      if (f1 == cube_inverse((*source).system)) {
        diff = cube_fl_cross_align_diff(st_col, s_sig_color, s_sig_face);
        cube_fl_cross_simple_align(source, s_sig_color, s_sig_face, 1);
        to_turn =
            cube_transform[st_col]
                          [(directions_transform[s_sig_face][st_col] + diff) %
                           4][0];
        sp_perform(source, 24 + to_turn);
      } else {
        if (cnt == 0) {
          sp_perform(source, f1 * 2 + 1);
          sp_perform(
              source,
              (cube_transform[st_col]
                             [(directions_transform[f1][st_col] + 3) % 4][0]) *
                  2);
          cube_fl_cross_simple_align(
              source, s_sig_color,
              cube_transform[st_col][(directions_transform[f1][st_col] + 3) % 4]
                            [0],
              0);
        } else {
          diff = cube_fl_cross_align_diff(st_col, s_sig_color,
                                          f1); // FIND BETTER ALG.
          cube_fl_cross_simple_align(source, s_sig_color, f1, 1);
          to_turn =
              cube_transform[st_col]
                            [(directions_transform[f1][st_col] + diff) % 4][0];
          sp_perform(source, 24 + to_turn);
          cube_fl_cross_rotate_corner(source, s_sig_color, cnt);
        }
      }
    } else if (layer == 1) {
      if (cnt == 0) {
        if (cube_transform[st_col][(directions_transform[f1][st_col] + 1) % 4]
                          [0] == s_sig_face) {
          sp_perform(source, (s_sig_face * 2) + 1);
        } else {
          sp_perform(source, (s_sig_face * 2));
        }
        cube_fl_cross_simple_align(source, s_sig_color, s_sig_face, 0);
      } else {
        cube_fl_cross_simple_align(source, s_sig_color, s_sig_face, 2);
        if (cube_transform[st_col][(directions_transform[f1][st_col] + 1) % 4]
                          [0] == s_sig_face) {
          sp_perform(source, (s_sig_face * 2) + 1);
        } else {
          sp_perform(source, (s_sig_face * 2));
        }
        cube_fl_cross_simple_align(source, s_sig_color, s_sig_face, 0);
      }
    }
  }
  return sp_perform(source, -1);
}

int cube_fl_corners_align_diff(int system, int sig_color_1, int sig_color_2,
                               int sig_face_1, int sig_face_2) {
  char w_dir = double_directions_transform[sig_color_1][sig_color_2][system];
  char i_dir = double_directions_transform[sig_face_1][sig_face_2][system];
  if ((w_dir - i_dir) < 0) {
    return (w_dir - i_dir + 4);
  } else {
    return w_dir - i_dir;
  }
}
void cube_fl_corners_insert_corner(cube *src, int f_1, // 0,1 : L, R
                                   int mode) // 2,3 : L', R' 4,5: L2, R2
{
  if (mode == 0) {
    sp_perform(src, f_1 * 2 + 1);
    sp_perform(src, cube_inverse((*src).system) * 2 + 1);
    sp_perform(src, f_1 * 2);
  }
  if (mode == 1) {
    sp_perform(src, f_1 * 2);
    sp_perform(src, cube_inverse((*src).system) * 2);
    sp_perform(src, f_1 * 2 + 1);
  }
  if (mode == 2) {
    sp_perform(src, f_1 * 2 + 1);
    sp_perform(src, cube_inverse((*src).system) * 2);
    sp_perform(src, f_1 * 2);
  }
  if (mode == 3) {
    sp_perform(src, f_1 * 2);
    sp_perform(src, cube_inverse((*src).system) * 2 + 1);
    sp_perform(src, f_1 * 2 + 1);
  }
  if (mode == 4) {
    sp_perform(src, f_1 * 2 + 1);
    sp_perform(src, cube_inverse((*src).system) + 24);
    sp_perform(src, f_1 * 2);
  }
  if (mode == 5) {
    sp_perform(src, f_1 * 2);
    sp_perform(src, cube_inverse((*src).system) + 24);
    sp_perform(src, f_1 * 2 + 1);
  }
}
void cube_fl_corners_simple_align(cube *src, int sig_color_1, int sig_color_2,
                                  int sig_face_1, int sig_face_2, int mode) {
  int diff = cube_fl_corners_align_diff((*src).system, sig_color_1, sig_color_2,
                                        sig_face_1, sig_face_2);
  if (mode == 1) {
    if (diff == 1) {
      sp_perform(src, cube_inverse((*src).system) * 2 + 1);
    }
    if (diff == 2) {
      sp_perform(src, cube_inverse((*src).system) + 24);
    }
    if (diff == 3) {
      sp_perform(src, cube_inverse((*src).system) * 2);
    }
  } else if (mode == 2) {
    if (diff == 1) {
      sp_perform(src, ((*src).system * 2) + 1);
    }
    if (diff == 2) {
      sp_perform(src, (*src).system + 24);
    }
    if (diff == 3) {
      sp_perform(src, ((*src).system * 2));
    }
  } else {
    if (diff == 1) {
      sp_perform(src, ((*src).system * 2));
    }
    if (diff == 2) {
      sp_perform(src, (*src).system + 24);
    }
    if (diff == 3) {
      sp_perform(src, ((*src).system * 2) + 1);
    }
  }
}

void cube_fl_corners_full_align(cube *src, int sig_color_1, int sig_color_2,
                                int sig_face_1, int sig_face_2) {
  int diff = cube_fl_corners_align_diff((*src).system, sig_color_1, sig_color_2,
                                        sig_face_1, sig_face_2);
  if (diff == 0) {
    return;
  }
  cube_fl_corners_insert_corner(src, sig_face_2, 3);
  cube_fl_corners_simple_align(src, sig_color_1, sig_color_2, sig_face_1,
                               sig_face_2, 1);
  int to_turn =
      cube_transform[(*src).system]
                    [(directions_transform[sig_face_2][(*src).system] + diff) %
                     4][0];
  cube_fl_corners_insert_corner(src, to_turn, 1);
}

int cube_fl_corners(cube *source) {

  int cnt, cnt1, layer;
  int st_col = (*source).system;
  int s_sig_color_1, s_sig_color_2;
  int f1, s_sig_face_1, s_sig_face_2, to_t, diff;
  for (cnt = 0; cnt < 4; cnt++) {
    s_sig_color_1 = cube_transform[(*source).system][cnt][0];
    s_sig_color_2 = cube_transform[(*source).system][cnt][1];
    cube_find_corner(source, (*source).system, s_sig_color_1, s_sig_color_2,
                     &f1, &s_sig_face_1, &s_sig_face_2);
    layer = cube_layer(source, f1, s_sig_face_1, s_sig_face_2);
    if (layer == 0) {
      if (st_col == f1) {
        cube_fl_corners_full_align(source, s_sig_color_1, s_sig_color_2,
                                   s_sig_face_1, s_sig_face_2);
      } else if (st_col == s_sig_face_2) // LEFT CORNER ORIENTATION
      {
        diff = cube_fl_corners_align_diff(
            st_col, s_sig_color_1, s_sig_color_2,
            cube_transform[st_col][(directions_transform[f1][st_col] + 2) % 4]
                          [0],
            cube_transform[st_col]
                          [(directions_transform[s_sig_face_1][st_col] + 2) % 4]
                          [0]);
        cube_fl_corners_insert_corner(source, f1, 4);
        cube_fl_corners_simple_align(
            source, s_sig_color_1, s_sig_color_2,
            cube_transform[st_col][(directions_transform[f1][st_col] + 2) % 4]
                          [0],
            cube_transform[st_col]
                          [(directions_transform[s_sig_face_1][st_col] + 2) % 4]
                          [0],
            1);
        to_t = cube_transform[st_col]
                             [(directions_transform[f1][st_col] + diff + 2) % 4]
                             [0];
        cube_fl_corners_insert_corner(source, to_t, 0);
      } else // RIGHT CORNER ORIENTATION
      {
        diff = cube_fl_corners_align_diff(
            st_col, s_sig_color_1, s_sig_color_2,
            cube_transform[st_col]
                          [(directions_transform[s_sig_face_2][st_col] + 2) % 4]
                          [0],
            cube_transform[st_col][(directions_transform[f1][st_col] + 2) % 4]
                          [0]);
        cube_fl_corners_insert_corner(source, f1, 5);
        cube_fl_corners_simple_align(
            source, s_sig_color_1, s_sig_color_2,
            cube_transform[st_col]
                          [(directions_transform[s_sig_face_2][st_col] + 2) % 4]
                          [0],
            cube_transform[st_col][(directions_transform[f1][st_col] + 2) % 4]
                          [0],
            1);
        to_t = cube_transform[st_col]
                             [(directions_transform[f1][st_col] + diff + 2) % 4]
                             [0];
        cube_fl_corners_insert_corner(source, to_t, 1);
      }
    } else if (cube_inverse(st_col) == f1) {
      diff = cube_fl_corners_align_diff(st_col, s_sig_color_1, s_sig_color_2,
                                        s_sig_face_2, s_sig_face_1);
      cube_fl_corners_simple_align(source, s_sig_color_1, s_sig_color_2,
                                   s_sig_face_2, s_sig_face_1, 1);
      to_t =
          cube_transform[st_col]
                        [(directions_transform[s_sig_face_1][st_col] + diff) %
                         4][0];
      cube_fl_corners_insert_corner(source, to_t, 3);
      sp_perform(source, 24 + cube_inverse(st_col));
      cube_fl_corners_insert_corner(source, to_t, 1);
    } else if (cube_inverse(st_col) == s_sig_face_1) {
      diff = cube_fl_corners_align_diff(st_col, s_sig_color_1, s_sig_color_2,
                                        f1, s_sig_face_2);
      cube_fl_corners_simple_align(source, s_sig_color_1, s_sig_color_2, f1,
                                   s_sig_face_2, 1);
      to_t = cube_transform[st_col]
                           [(directions_transform[f1][st_col] + diff) % 4][0];
      cube_fl_corners_insert_corner(source, to_t, 0);
    } else {
      diff = cube_fl_corners_align_diff(st_col, s_sig_color_1, s_sig_color_2,
                                        s_sig_face_1, f1);
      cube_fl_corners_simple_align(source, s_sig_color_1, s_sig_color_2,
                                   s_sig_face_1, f1, 1);
      to_t = cube_transform[st_col]
                           [(directions_transform[f1][st_col] + diff) % 4][0];
      cube_fl_corners_insert_corner(source, to_t, 1);
    }
  }
  return sp_perform(source, -1);
}

int cube_sl_solve_align_diff(int system, int sig_color, int sig_face) {
  char w_dir = directions_transform[sig_color][system];
  char i_dir = directions_transform[sig_face][system];
  if ((w_dir - i_dir) < 0) {
    return (w_dir - i_dir + 4);
  } else {
    return w_dir - i_dir;
  }
}
void cube_sl_solve_align_edge(cube *src, int sig_color, int sig_face) {
  int diff = cube_sl_solve_align_diff(cube_inverse((*src).system), sig_color,
                                      sig_face);
  if (diff == 1) {
    sp_perform(src, cube_inverse((*src).system) * 2);
  }
  if (diff == 2) {
    sp_perform(src, cube_inverse((*src).system) + 24);
  }
  if (diff == 3) {
    sp_perform(src, cube_inverse((*src).system) * 2 + 1);
  }
}
void cube_sl_solve_insert_edge(cube *source, int face, int mode) {
  int col = cube_inverse((*source).system);
  int f1 =
      cube_transform[col]
                    [(directions_transform[face][col] + 1 + (mode * 2)) % 4][0];
  if (mode == 0) {
    sp_perform(source, col * 2 + 1);
    sp_perform(source, f1 * 2 + 1);
    sp_perform(source, col * 2 + 1);
    sp_perform(source, f1 * 2);
    sp_perform(source, col * 2);
    sp_perform(source, face * 2);
    sp_perform(source, col * 2);
    sp_perform(source, face * 2 + 1);
  }
  if (mode == 1) {
    sp_perform(source, col * 2);
    sp_perform(source, f1 * 2);
    sp_perform(source, col * 2);
    sp_perform(source, f1 * 2 + 1);
    sp_perform(source, col * 2 + 1);
    sp_perform(source, face * 2 + 1);
    sp_perform(source, col * 2 + 1);
    sp_perform(source, face * 2);
  }
}
void cube_sl_solve_full_align(cube *source, int sig_color_1, int sig_color_2,
                              int sig_face_1, int sig_face_2) {
  int st_col = cube_inverse((*source).system);
  int to_turn, diff;
  if (sig_face_1 == st_col) {
    diff = cube_sl_solve_align_diff(st_col, sig_color_2, sig_face_2);
    cube_sl_solve_align_edge(source, sig_color_2, sig_face_2);
    to_turn =
        cube_transform[st_col]
                      [(directions_transform[sig_face_2][st_col] + diff) % 4]
                      [0];
    cube_sl_solve_insert_edge(source, to_turn, 1);
  } else {
    diff = cube_sl_solve_align_diff(st_col, sig_color_1, sig_face_1);
    cube_sl_solve_align_edge(source, sig_color_1, sig_face_1);
    to_turn =
        cube_transform[st_col]
                      [(directions_transform[sig_face_1][st_col] + diff) % 4]
                      [0];
    cube_sl_solve_insert_edge(source, to_turn, 0);
  }
}

int cube_sl_solve(cube *source) {
  int s_sig_face_1, s_sig_face_2, s_1, s_2, layer;
  int st_col = cube_inverse((*source).system);
  int cnt, cnt2, diff, to_turn, s_sig_color_1, s_sig_color_2, naspr;

  for (cnt = 0; cnt < 4; cnt++) {
    s_sig_color_1 = cube_transform[st_col][cnt][0];
    s_sig_color_2 = cube_transform[st_col][cnt][1];
    cube_find_edge(source, s_sig_color_1, s_sig_color_2, &s_sig_face_1,
                   &s_sig_face_2);
    layer = cube_layer(source, s_sig_face_1, s_sig_face_2, -1);

    if ((s_sig_color_1 == s_sig_face_1) && (s_sig_color_2 == s_sig_face_2)) {
      continue;
    }
    if (layer == 2) {
      cube_sl_solve_full_align(source, s_sig_color_1, s_sig_color_2,
                               s_sig_face_1, s_sig_face_2);
    } else {
      for (cnt2 = 0; cnt2 < 4; cnt2++) {
        cube_find_edge(source, st_col, cube_transform[st_col][cnt2][0], &s_1,
                       &s_2);
        if ((s_1 == st_col) || (s_2 == st_col)) {
          break;
        }
      }
      if (s_1 == st_col) {
        cube_sl_solve_align_edge(source, s_sig_face_1, s_2);
        naspr = cube_inverse(s_2);
      } else {
        cube_sl_solve_align_edge(source, s_sig_face_1, s_1);
        naspr = cube_inverse(s_1);
      }
      if (s_sig_face_2 ==
          cube_transform[st_col]
                        [(directions_transform[s_sig_face_1][st_col] + 1) % 4]
                        [0]) {
        cube_sl_solve_insert_edge(source, s_sig_face_1, 0);
      } else {
        cube_sl_solve_insert_edge(source, s_sig_face_1, 1);
      }
      cube_find_edge(source, s_sig_color_1, s_sig_color_2, &s_sig_face_1,
                     &s_sig_face_2);
      cube_sl_solve_full_align(source, s_sig_color_1, s_sig_color_2,
                               s_sig_face_1, s_sig_face_2);
    }
  }
  return sp_perform(source, -1);
}

void cube_ll_cross_perform_state_change(cube *src, int front, int mode) {
  int st_col = cube_inverse((*src).system);
  sp_perform(src, front * 2);
  if (mode == 0) {
    sp_perform(src, st_col * 2);
    sp_perform(
        src, cube_transform[st_col]
                           [(directions_transform[front][st_col] + 3) % 4][0] *
                 2);
    sp_perform(src, st_col * 2 + 1);
    sp_perform(
        src, cube_transform[st_col]
                           [(directions_transform[front][st_col] + 3) % 4][0] *
                     2 +
                 1);
  } else {
    sp_perform(
        src, cube_transform[st_col] // Thanks to Klemen Pečnik
                           [(directions_transform[front][st_col] + 3) % 4][0] *
                 2);
    sp_perform(src, st_col * 2);
    sp_perform(
        src, cube_transform[st_col]
                           [(directions_transform[front][st_col] + 3) % 4][0] *
                     2 +
                 1);
    sp_perform(src, st_col * 2 + 1);
  }
  sp_perform(src, front * 2 + 1);
}
void cube_ll_cross_scan_state(cube *src, int *state, int *front) {
  int cnt;
  int st_col = cube_inverse((*src).system);
  *state = 0;
  *front = 0;
  for (cnt = 0; cnt < 4; cnt++) {
    if ((*src).sides[st_col][edge_transform[cnt]] == st_col) {
      if ((*src).sides[st_col][edge_transform[(cnt + 3) % 4]] == st_col) {
        if ((*src).sides[st_col][edge_transform[(cnt + 2) % 4]] == st_col) {
          *state = 3;
        } else {
          *state = 2;
          *front = (cnt + 2) % 4;
        }
      } else if ((*src).sides[st_col][edge_transform[(cnt + 1) % 4]] ==
                 st_col) {
        *state = 2;
        *front = (cnt + 3) % 4;
      } else if ((*src).sides[st_col][edge_transform[(cnt + 2) % 4]] ==
                 st_col) {
        *state = 1;
        *front = (cnt + 1) % 4;
      } else {
        *state = -1;
      }
      break;
    }
  }
}

int cube_ll_cross(cube *source) {
  int state, front, ff;
  cube_ll_cross_scan_state(source, &state, &front);

  if (state == -1) {
    return -1;
  }
  while (state != 3) {
    ff = cube_transform[cube_inverse((*source).system)][front][0];
    switch (state) {
    case 0:
      cube_ll_cross_perform_state_change(source, ff, 0);
      break;
    case 1:
      cube_ll_cross_perform_state_change(source, ff, 1);
      break;
    case 2:
      cube_ll_cross_perform_state_change(source, ff, 0);
      break;
    }
    cube_ll_cross_scan_state(source, &state, &front);
  }
  return sp_perform(source, -1);
}

int cube_ll_corners_align_relative_position(int base, int *corner) {
  int cnt, cnt2;
  int flag;
  for (cnt = 0; cnt < 4; cnt++) {
    flag = 1;
    for (cnt2 = 0; cnt2 < 3; cnt2++) {
      flag = flag && ((base == corner[cnt2]) ||
                      (cube_transform[base][cnt][0] == corner[cnt2]) ||
                      (cube_transform[base][cnt][1] == corner[cnt2]));
    }
    if (flag) {
      return cnt;
    }
  }
  return -1;
}
int cube_ll_corners_align_check_corner(int *c_1, int *c_2) {
  int cnt1, cnt2;
  int flag = 0;
  for (cnt1 = 0; cnt1 < 3; cnt1++) {
    for (cnt2 = 0; cnt2 < 3; cnt2++) {
      if (c_1[cnt1] == c_2[cnt2]) {
        flag++;
      }
    }
  }
  if (flag == 3) {
    return 1;
  } else {
    return 0;
  }
}
void cube_ll_corners_align_exchange_corners(cube *src, int face) {
  int base = cube_inverse((*src).system);
  sp_perform(
      src,
      cube_transform[base][(directions_transform[face][base] + 1) % 4][0] * 2);
  sp_perform(src, base * 2 + 1);
  sp_perform(
      src,
      cube_transform[base][(directions_transform[face][base] + 3) % 4][0] * 2 +
          1);
  sp_perform(src, base * 2);
  sp_perform(
      src,
      cube_transform[base][(directions_transform[face][base] + 1) % 4][0] * 2 +
          1);
  sp_perform(src, base * 2 + 1);
  sp_perform(
      src,
      cube_transform[base][(directions_transform[face][base] + 3) % 4][0] * 2);
  sp_perform(src, base + 24);
}

int cube_ll_corners_align(cube *source) {

  int cnt, cnt1, cnt2, aligned;
  int corners[4][3];
  int sides[4][3];
  int st_col = cube_inverse((*source).system);
  for (cnt = 0; cnt < 4; cnt++) {
    sides[cnt][0] = st_col;
    sides[cnt][1] = cube_transform[st_col][cnt][0];
    sides[cnt][2] = cube_transform[st_col][cnt][1];
    cube_get_corner(source, sides[cnt][0], sides[cnt][1], sides[cnt][2],
                    corners[cnt], corners[cnt] + 1, corners[cnt] + 2);
  }
  for (cnt = 0; cnt < 2; cnt++) {
    aligned = 0;
    for (cnt1 = 0; cnt1 < 3; cnt1++) {
      for (cnt2 = 0; cnt2 < 3; cnt2++) {
        if ((corners[cnt][cnt1] == corners[(cnt + 3) % 4][cnt2]) &&
            (corners[cnt][cnt1] != st_col)) {
          aligned = 1;
          break;
        }
      }
    }
    if (aligned) {
      break;
    }
  }
  if (!aligned) {
    return -1; // SOMETHING IS TERRIBLY WRONG
  }
  if (((cube_ll_corners_align_relative_position(st_col, corners[cnt]) -
        cube_ll_corners_align_relative_position(st_col,
                                                corners[(cnt + 3) % 4]) +
        4) %
       4) != 1) {
    cube_ll_corners_align_exchange_corners(
        source, cube_transform[st_col][(cnt + 1) % 4][0]);
  }
  if (((cube_ll_corners_align_relative_position(st_col,
                                                corners[(cnt + 2) % 4]) -
        cube_ll_corners_align_relative_position(st_col,
                                                corners[(cnt + 1) % 4]) +
        4) %
       4) != 1) {
    sp_perform(source, st_col + 24);
    cube_ll_corners_align_exchange_corners(
        source, cube_transform[st_col][(cnt + 1) % 4][0]);
    sp_perform(source, st_col + 24);
  }
  cube_get_corner(source, st_col, cube_transform[st_col][0][0],
                  cube_transform[st_col][0][1], corners[0], corners[0] + 1,
                  corners[0] + 2);
  if (cube_ll_corners_align_check_corner(sides[0], corners[0])) {
    return sp_perform(source, -1);
  }
  if (cube_ll_corners_align_check_corner(sides[1], corners[0])) {
    sp_perform(source, st_col * 2);
    return sp_perform(source, -1);
  }
  if (cube_ll_corners_align_check_corner(sides[2], corners[0])) {
    sp_perform(source, st_col + 24);
    return sp_perform(source, -1);
  }
  if (cube_ll_corners_align_check_corner(sides[3], corners[0])) {
    sp_perform(source, st_col * 2 + 1);
    return sp_perform(source, -1);
  }
}

void cube_ll_corners_orient_scan_state(cube *source, int st_col, int *state,
                                       int *orientation) {
  int cnt0, cnt, cnt1, flag, c1, c2;

  for (cnt0 = 0; cnt0 < 8; cnt0++) {
    for (cnt = 0; cnt < 4; cnt++) {
      flag = 1;
      for (cnt1 = 0; cnt1 < 4; cnt1++) {
        c2 = ((*source)
                  .sides[cube_transform[st_col][(cnt + cnt1) % 4][0]]
                        [sp_corner_transform
                             [cube_transform[st_col][(cnt + cnt1) % 4][2]]] ==
              st_col)
                 ? 1
                 : 0;
        c1 =
            ((*source)
                 .sides[cube_transform[st_col][(cnt + cnt1) % 4][0]]
                       [sp_corner_transform
                            [(cube_transform[st_col][(cnt + cnt1) % 4][2] + 1) %
                             4]] == st_col)
                ? 1
                : 0;
        flag = flag && (c1 == sp_case_sides[cnt0][cnt1][0]) &&
               (c2 == sp_case_sides[cnt0][cnt1][1]);
      }
      if (flag) {
        break;
      }
    }
    if (flag) {
      break;
    }
  }

  if (!flag) {
    return;
  }
  *state = cnt0;
  *orientation = cnt;
}

int cube_ll_corners_orient_perform_twist(cube *src, int st_col, int dir,
                                         int mode) {
  int ff = cube_transform[st_col][(dir + 3) % 4][0];
  if (mode == 0) {
    sp_perform(src, ff * 2);
    sp_perform(src, st_col * 2);
    sp_perform(src, ff * 2 + 1);
    sp_perform(src, st_col * 2);
    sp_perform(src, ff * 2);
    sp_perform(src, st_col + 24);
    sp_perform(src, ff * 2 + 1);
  } else if (mode == 1) {
    sp_perform(src, ff * 2 + 1);
    sp_perform(src, st_col * 2 + 1);
    sp_perform(src, ff * 2);
    sp_perform(src, st_col * 2 + 1);
    sp_perform(src, ff * 2 + 1);
    sp_perform(src, st_col + 24);
    sp_perform(src, ff * 2);
  }
}

int cube_ll_corners_orient(cube *source) {
  int st_col = cube_inverse((*source).system);
  int cnt, state, or, pp;
  pp = 0;
  cube_ll_corners_orient_scan_state(source, st_col, &state, & or);
  while (state != 0) {
    switch (state) {
    case 1:
      cube_ll_corners_orient_perform_twist(source, st_col, or +2, 0);
      break;
    case 2:
      cube_ll_corners_orient_perform_twist(source, st_col, or +1, 0);
      break;
    case 3:
      cube_ll_corners_orient_perform_twist(source, st_col, or, 0);
      break;
    case 4:
      cube_ll_corners_orient_perform_twist(source, st_col, or, 1);
      break;
    case 5:
      cube_ll_corners_orient_perform_twist(source, st_col, or +1, 0);
      break;
    case 6:
      cube_ll_corners_orient_perform_twist(source, st_col, or, 1);
      break;
    case 7:
      cube_ll_corners_orient_perform_twist(source, st_col, or, 0);
      break;
    }
    cube_ll_corners_orient_scan_state(source, st_col, &state, & or);
    pp++;
  }
  if (pp % 2 == 1) {
    sp_perform(source, st_col + 24);
  }
  return sp_perform(source, -1);
}

int cube_ll_permute_edges_perform_exchange(cube *src, int st_col, int dir,
                                           int mode) {
  int ff = cube_transform[st_col][(dir + 3) % 4][0];
  if (mode == 0) {
    sp_perform(src, ff + 24);
    sp_perform(src, st_col * 2);
    sp_perform(src, ff * 2);
    sp_perform(src, st_col * 2);
    sp_perform(src, ff * 2 + 1);
    sp_perform(src, st_col * 2 + 1);
    sp_perform(src, ff * 2 + 1);
    sp_perform(src, st_col * 2 + 1);
    sp_perform(src, ff * 2 + 1);
    sp_perform(src, st_col * 2);
    sp_perform(src, ff * 2 + 1);
  } else if (mode == 1) {
    sp_perform(src, ff + 24);
    sp_perform(src, st_col * 2 + 1);
    sp_perform(src, ff * 2 + 1);
    sp_perform(src, st_col * 2 + 1);
    sp_perform(src, ff * 2);
    sp_perform(src, st_col * 2);
    sp_perform(src, ff * 2);
    sp_perform(src, st_col * 2);
    sp_perform(src, ff * 2);
    sp_perform(src, st_col * 2 + 1);
    sp_perform(src, ff * 2);
  }
}

int cube_ll_permute_edges(cube *source) {
  int st_col = cube_inverse((*source).system);

  int cnt, or ;
  or = -1;
  if (cube_solved(source)) {
    return 0;
  }
  while (or == -1) {
    for (cnt = 0; cnt < 4; cnt++) {
      if (((*source).sides[cube_transform[st_col][cnt][0]]
                          [edge_transform[cube_transform[st_col][cnt][2]]]) ==
          ((*source).sides[cube_transform[st_col][(cnt + 2) % 4][0]][4])) {
        if (or == -1) {
          or = (cnt + 3) % 4;
        } else {
          or = -1;
        }
      }
    }
    if (or == -1) {
      cube_ll_permute_edges_perform_exchange(source, st_col, 0, 0);
    }
  }
  if ((*source).sides[cube_transform[st_col][or][0]]
                     [edge_transform[cube_transform[st_col][or][2]]] !=
      (*source).sides[cube_transform[st_col][or][0]][4]) {
    cube_ll_permute_edges_perform_exchange(source, st_col, or, 0);
  } else {
    cube_ll_permute_edges_perform_exchange(source, st_col, or, 1);
  }
  return sp_perform(source, -1);
}

int cube_optimize_algorithm_s_pop(int *stack_pos, int *stack) {
  if ((*stack_pos) == 0) {
    return 0xFF;
  }
  (*stack_pos)--;
  return stack[*stack_pos];
}
void cube_optimize_algorithm_s_push(int *stack_pos, int *stack, int value) {
  (*stack_pos)++;
  stack[(*stack_pos) - 1] = value;
}

void cube_optimize_algorithm_parse(int value, int *class, int *face) {
  if ((value > 23) && (value < 31)) {
    *face = value - 24;
    *class = 2;
  } else if (value < 12) {
    *face = value / 2;
    *class = value % 2;
  }
}

int *cube_optimize_algorithm(int *alg) {
  int stack_pos = 0;
  int stack[1024];

  int count = 0;
  int cnt, vll, v1, c1, v2, c2;
  while (alg[count] != -1) {
    count++;
  }
  for (cnt = 0; cnt < count; cnt++) {
    cube_optimize_algorithm_parse(alg[cnt], &c1, &v1);
    vll = cube_optimize_algorithm_s_pop(&stack_pos, stack);
    cube_optimize_algorithm_parse(vll, &c2, &v2);
    if ((v2 != v1) || (vll == 0xff) || (alg[cnt] < 0)) {
      if (vll != 0xff) {
        cube_optimize_algorithm_s_push(&stack_pos, stack, vll);
      }
      cube_optimize_algorithm_s_push(&stack_pos, stack, alg[cnt]);
    } else {
      if (((c1 == 0) && (c2 == 1)) || ((c1 == 1) && (c2 == 0)) ||
          ((c1 == 2) && (c2 == 2))) {
      } else if (((c1 == 1) && (c2 == 2)) || ((c1 == 2) && (c2 == 1))) {
        cube_optimize_algorithm_s_push(&stack_pos, stack, v1 * 2);
      } else if (((c1 == 0) && (c2 == 2)) || ((c1 == 2) && (c2 == 0))) {
        cube_optimize_algorithm_s_push(&stack_pos, stack, v1 * 2 + 1);
      } else {
        cube_optimize_algorithm_s_push(&stack_pos, stack, v1 + 24);
      }
    }
  }
  cnt = 0;
  while (cnt < stack_pos) {
    alg[cnt] = stack[cnt];
    cnt++;
  }
  alg[cnt] = -1;
}

void cube_recolor(cube *input) {
  int i, j;
  char replacements[6];
  for (i = 0; i < 6; i++) {
    replacements[(*input).sides[i][4]] = i;
  }

  for (i = 0; i < 6; i++) {
    for (j = 0; j < 9; j++) {
      (*input).sides[i][j] = replacements[(*input).sides[i][j]];
    }
  }
}

void cube_solve(cube *source, int *alg) {
  int min = INT_MAX;
  int cnt, cnt2;
  cube copy;

  for (cnt = 0; cnt < 6; cnt++) {
    record_count = 0;
    copy = *source;
    copy.system = cnt;

    cube_fl_cross(&copy);
    sp_perform(&copy, -2);
    cube_fl_corners(&copy);
    sp_perform(&copy, -2);
    cube_sl_solve(&copy);
    sp_perform(&copy, -2);
    cube_ll_cross(&copy);
    sp_perform(&copy, -2);
    cube_ll_corners_align(&copy);
    sp_perform(&copy, -2);
    cube_ll_corners_orient(&copy);
    sp_perform(&copy, -2);
    cube_ll_permute_edges(&copy);
    sp_perform(&copy, -2);
    if (record_count < min) {
      memcpy(alg, record_algorithm, sizeof(int) * record_count);
      alg[record_count] = -1;
      min = record_count;
    }
  }
}

int cube_out(cube *cube, char *cube_data) {
  int i, j;
  for (i = 0; i < 6; i++) {
    for (j = 0; j < 9; j++) {
      *(cube_data++) = (*cube).sides[i][j];
    }
  }
  return 0;
}

int cube_read(cube *cube, char *cube_data) {
  char buf[9];
  int i, j;
  for (i = 0; i < 6; i++) {
    for (j = 0; j < 9; j++) {
      (*cube).sides[i][j] = *(cube_data++);
    }
  }
  return 0;
}

EMSCRIPTEN_KEEPALIVE
int init() {
  srand(time(NULL));
  cube_init();
  return 0;
}

EMSCRIPTEN_KEEPALIVE
int perform(char *cube_data, int operation) {
  cube c_main;
  cube_read(&c_main, cube_data);
  cube_perform(&c_main, operation);
  cube_out(&c_main, cube_data);
  return 0;
}

EMSCRIPTEN_KEEPALIVE
int recolor(char *cube_data) {
  cube c_main;
  cube_read(&c_main, cube_data);
  cube_recolor(&c_main);
  cube_out(&c_main, cube_data);
  return 0;
}

EMSCRIPTEN_KEEPALIVE
void scramble(char *alg, int depth) {
  int cnt;
  int dum, cur;
  int prev = -1;
  for (cnt = 0; cnt < depth; cnt++) {
    do {
      if (cnt != 0) {
        prev = cur;
      }
      dum = rand() % 18;
      if (dum < 12) {
        alg[cnt] = dum;
        cur = dum / 2;
      } else {
        alg[cnt] = dum + 12;
        cur = dum - 12;
      }

    } while (prev == cur);
  }
  alg[cnt] = -1;
}

EMSCRIPTEN_KEEPALIVE
int solve(char *cube_data, char *out_alg) {
  cube c_main;
  int alg[1024];
  cube_read(&c_main, cube_data);
  cube_recolor(&c_main);
  cube_solve(&c_main, alg);
  cube_optimize_algorithm(alg);
  for (int i = 0; i < 1024; ++i) {
    out_alg[i] = alg[i];
    if (alg[i] == -1) {
      return 0;
    }
  }

  return 1;
}