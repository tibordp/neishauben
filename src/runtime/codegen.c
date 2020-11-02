#include "src/runtime/rubiks.h"
#include <stdio.h>

extern void cube_init();
extern void cube_populate_optimizations();
extern int optimizations_lookup[OPT_LOOKUP_SIZE];

int main() {
  cube_init();
  cube_populate_optimizations();

  printf("int optimizations_lookup[OPT_LOOKUP_SIZE] = {");
  for (int i = 0; i < OPT_LOOKUP_SIZE; ++i) {
    if (i % OPERATION_COUNT == 0 && i != 0) {
      printf("0x%x,\n", optimizations_lookup[i]);
    } else if (i == OPT_LOOKUP_SIZE - 1) {
      printf("0x%x\n", optimizations_lookup[i]);
    } else {
      printf("0x%x, ", optimizations_lookup[i]);
    }
  }
  printf("};\n");
}