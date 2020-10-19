#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct var {
  int F[9]; int B[9];
  int U[9]; int D[9];
  int L[9]; int R[9]; 
  int valid;
} cube;

struct BMPHeader
{
    char bfType[2];       /* "BM" */
    int bfSize;           /* Size of file in bytes */
    int bfReserved;       /* set to 0 */
    int bfOffBits;        /* Byte offset to actual bitmap data (= 54) */
    int biSize;           /* Size of BITMAPINFOHEADER, in bytes (= 40) */
    int biWidth;          /* Width of image, in pixels */
    int biHeight;         /* Height of images, in pixels */
    short biPlanes;       /* Number of planes in target device (set to 1) */
    short biBitCount;     /* Bits per pixel (24 in this case) */
    int biCompression;    /* Type of compression (0 if no compression) */
    int biSizeImage;      /* Image size, in bytes (0 if no compression) */
    int biXPelsPerMeter;  /* Resolution in pixels/meter of display device */
    int biYPelsPerMeter;  /* Resolution in pixels/meter of display device */
    int biClrUsed;        /* Number of colors in the color table (if 0, use 
                             maximum allowed by biBitCount) */
    int biClrImportant;   /* Number of important colors.  If 0, all colors 
                             are important */
};

int
read_bmp(const char *filename, int *width, int *height, unsigned char *rgb)
{
    fprintf(stderr, "Sorry, reading of .bmp files isn't supported yet.\n");
    return(0);
}

int 
write_bmp(const char *filename, int width, int height, char *rgb)
{
    int i, j, ipos;
    int bytesPerLine;
    unsigned char *line;

    FILE *file;
    struct BMPHeader bmph;

    /* The length of each line must be a multiple of 4 bytes */

    bytesPerLine = (3 * (width + 1) / 4) * 4;

    strcpy(bmph.bfType, "BM");
    bmph.bfOffBits = 54;
    bmph.bfSize = bmph.bfOffBits + bytesPerLine * height;
    bmph.bfReserved = 0;
    bmph.biSize = 40;
    bmph.biWidth = width;
    bmph.biHeight = height;
    bmph.biPlanes = 1;
    bmph.biBitCount = 24;
    bmph.biCompression = 0;
    bmph.biSizeImage = bytesPerLine * height;
    bmph.biXPelsPerMeter = 0;
    bmph.biYPelsPerMeter = 0;
    bmph.biClrUsed = 0;       
    bmph.biClrImportant = 0; 

    file = fopen (filename, "wb");
    if (file == NULL) return(0);
  
    fwrite(&bmph.bfType, 2, 1, file);
    fwrite(&bmph.bfSize, 4, 1, file);
    fwrite(&bmph.bfReserved, 4, 1, file);
    fwrite(&bmph.bfOffBits, 4, 1, file);
    fwrite(&bmph.biSize, 4, 1, file);
    fwrite(&bmph.biWidth, 4, 1, file);
    fwrite(&bmph.biHeight, 4, 1, file);
    fwrite(&bmph.biPlanes, 2, 1, file);
    fwrite(&bmph.biBitCount, 2, 1, file);
    fwrite(&bmph.biCompression, 4, 1, file);
    fwrite(&bmph.biSizeImage, 4, 1, file);
    fwrite(&bmph.biXPelsPerMeter, 4, 1, file);
    fwrite(&bmph.biYPelsPerMeter, 4, 1, file);
    fwrite(&bmph.biClrUsed, 4, 1, file);
    fwrite(&bmph.biClrImportant, 4, 1, file);
  
    line = malloc(bytesPerLine);
    if (line == NULL)
    {
        fprintf(stderr, "Can't allocate memory for BMP file.\n");
        return(0);
    }

    for (i = height - 1; i >= 0; i--)
    {
        for (j = 0; j < width; j++)
        {
            ipos = 3 * (width * i + j);
            line[3*j] = rgb[ipos + 2];
            line[3*j+1] = rgb[ipos + 1];
            line[3*j+2] = rgb[ipos];
        }
        fwrite(line, bytesPerLine, 1, file);
    }

    free(line);
    fclose(file);

    return(1);
}

//L U2 R F' B' R2 L' B2 F L2 D' B U R2 F' R' U R L F R D U R2 
typedef struct ff_1 
 {
   int Q_1,W_1,Q_2,W_2;
   int blank, border;
 } rubiks_pos;

rubiks_pos get_position(int X, int Y, int c_size)
{
  rubiks_pos temp;
  temp.blank = 1;
  temp.border = 0;
  if ((Y<2) | (X<2)) { return temp; }
  int Q = (Y-2) / ((c_size*3)+4);
  int Q1 = (Y-2-Q) / (c_size+1);
  int W = (X-2) / ((c_size*3)+4);
  int W1 = (X-2-W) / (c_size+1);
  /*
  if (Q1 % 4 == 3) { return temp; }
  if (W1 % 4 == 3) { return temp; } */
  if (((X-2) % ((c_size*3)+4) > ((c_size*3)+1)) |  ((Y-2) % ((c_size*3)+4) > ((c_size*3)+1)) |
   ((X-2-W) % (c_size+1) > (c_size-1)) | ((Y-2-Q) % (c_size+1) > (c_size-1))) 
  { return temp; } 

  if (((X-2-W) % (c_size+1) == 0) ^ ((X-2-W) % (c_size+1) == c_size-1) ^ 
((Y-2-Q) % (c_size+1) == 0) ^ ((Y-2-Q) % (c_size+1) == c_size-1)) { temp.border = 1; } 

  temp.Q_1 = Q;
  temp.W_1 = W;
  temp.Q_2 = Q1 % 3;
  temp.W_2 = W1 % 3;

  temp.blank = 0;
  return temp;

}

void write_color(unsigned char *pos, int color)
{
  if (color == -1) { *pos = 0x00; *(pos+1) = 0x00; *(pos+2) = 0x00; }
   if (color == 3) { *pos = 0xff; *(pos+1) = 0xff; *(pos+2) = 0xff; }
   if (color == 2) { *pos = 0xff; *(pos+1) = 0xff; *(pos+2) = 0x00; }
   if (color == 0) { *pos = 0x19; *(pos+1) = 0x19; *(pos+2) = 0xaa; }
   if (color == 1) { *pos = 0x00; *(pos+1) = 0xcd; *(pos+2) = 0x00; }
   if (color == 4) { *pos = 0xff; *(pos+1) = 0x75; *(pos+2) = 0x00; }
   if (color == 5) { *pos = 0xDE; *(pos+1) = 0x1a; *(pos+2) = 0x1a; }
}

cube read()
{
 char *buf;
 int i, j;
 cube temp;
 int * faces[6]	= {temp.F, temp.B, temp.U, temp.D, temp.L, temp.R};
 buf = (char *) malloc(9);
 temp.valid = 0;
 for (i=0; i<6; i++) { 
  if (fread(buf, sizeof(char), 9, stdin) != 9) return temp;  
  for (j=0; j<9; j++)
    {
      *(faces[i]+j) = *(buf+j) - 0x30;
    }
 }
 free(buf);
 temp.valid = 1;
 return temp;
}

int cube_color(cube source, rubiks_pos pos_pp)
{
   int seq = pos_pp.Q_2 * 3 + pos_pp.W_2;
   if ((pos_pp.blank == 1) | ((pos_pp.Q_1 < 2) & ((pos_pp.W_1 % 2) == 0))
                         | ((pos_pp.Q_1 == 3) & ((pos_pp.W_1 % 2) == 0)))
    return 3;
      else
        if (pos_pp.border == 1)
          return -1;
        else
           {
             if ((pos_pp.Q_1 == 0) & (pos_pp.W_1 == 1)) return source.D[seq];
             if ((pos_pp.Q_1 == 1) & (pos_pp.W_1 == 1)) return source.B[seq]; 
             if ((pos_pp.Q_1 == 2) & (pos_pp.W_1 == 0)) return source.L[seq]; 
             if ((pos_pp.Q_1 == 2) & (pos_pp.W_1 == 1)) return source.U[seq];
             if ((pos_pp.Q_1 == 2) & (pos_pp.W_1 == 2)) return source.R[seq];
             if ((pos_pp.Q_1 == 3) & (pos_pp.W_1 == 1)) return source.F[seq];
           }
}

/*
int itoa(long int a, char * b)
{
  long int c = a;
  char buf[0xff];
  int cnt = 0;
  int cnt2; 
  do
  {
    buf[cnt] = (c % 10) + 0x30;
    c = c / 10;
    cnt++;
  }  
  while (c != 0);
  for (cnt2=cnt-1;cnt2 > -1;cnt2--)
  {
    b[cnt-1-cnt2] = buf[cnt2];
    }
  return cnt;
}
*/

int main()
{
  int y, x;
  int csize = 30	;
  int count, zapp, posh;
  rubiks_pos ppp;
  int width = csize*9+14;
  int height = csize*12+18;
  unsigned char *data;
  char fn[10];
  data = (char *) malloc(3 * width * height);
  zapp=0;
  while (!feof(stdin))
  {
  cube input = read();
    if (!input.valid) continue;
  count = 0;
  for (y=0; y<height; y++)
  for (x=0; x<width; x++)
    {
      ppp = get_position(x,y,csize);
      write_color(data+count*3, cube_color(input, ppp));
      count++;   
    }
  sprintf(fn, "./%d.bmp", zapp);
  zapp++;
  write_bmp(fn, width, height, data); 
  //fprintf(stderr, "%d, %s\n", zapp, fn	);
  }
  free(data);
     
}

