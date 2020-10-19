all: cubedraw rubiks

cubedraw: cubedraw.c
	$(CC) cubedraw.c -o cubedraw

rubiks: rubiks.c
	$(CC) rubiks.c -o rubiks

.PHONY: clean

clean:
	rm rubiks
	rm cubedraw
