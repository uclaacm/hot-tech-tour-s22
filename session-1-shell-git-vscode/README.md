
# Hot Tech Tour - Spring 2022 - Session 1

**Date**: April 13, 2022

**Location**: Boelter 9436

**Teachers**: 
- [Anakin Trotter](https://github.com/AnakinTrotter)
- [Chandra Suresh](https://github.com/curesh)
- [Jakob Reinwald](https://github.com/jakobreinwald)

## Resources

- [Slides](https://docs.google.com/presentation/d/1VNBXTLrDQU0_nzTjHRkjRetLECKXch1eQCDmZ1wPrBM/edit?usp=sharing)

## Downloads
 - [git](https://git-scm.com/download/)
 - [VSCode](https://code.visualstudio.com/download)

## What we'll be learning today

- [Basic shell commmands](#basic-shell-commands)
- [git](#git)
- [VSCode](#vscode)
- [Bash scripting](#bash-scripting)

## Basic shell commands

### How to terminal?
The terminal is a program that lets us use our computer without a GUI (graphical user interface).
Everything that can be accomplished with keyboard and mouse can be accomplished using a series of
commands in the terminal. To open the terminal, search for terminal in the Mac Launchpad or search for
git bash in the Windows start menu (we will be learning bash commands). To run a command, type something
and press enter. Try typing "ls" and see what it does!

### Useful commands and operators
 - **ls**
    - lists files and folders in current directory
 - **cd** path_name_goes_here
    - changes the directory to the specified one
 - **touch** file_name_goes_here
    - creates a file with the given name
 - **rm** file_name_goes_here
    - deletes the specified file
 - **mkdir** folder_name_goes_here
    - creates a folder with the given name
 - **rmdir** folder_name_goes_here
    - deletes the specified folder ONLY IF IT IS EMPTY (use rm -rf for full folders)
 - **mv** source_path destination_path
    - moves a file or folder from the source to the destination
 - some_command **&&** other_command
    - executes other_command only if some_command succeeds (no errors)
 - some_command **||** other_command
    - executes other_command only if some_command fails (gives an error)

## Bash scripting

## Variables
Variables are used to store values so that we can access them later.
```
NAME="John"
echo $NAME
echo "$NAME"
echo "${NAME}!"
```

## If-else
If block starts with if and ends with fi. Boolean expressions go in brackets. Pay attention to spacing!
```
if [ $a -eq 5 ]; then
  echo "a equals 5"
elif [ $a -eq 4 ]; then
  echo "a equals 4"
else
  echo "unfortunate"
fi
```

## Loops
Loop blocks start with do and end with done.
```
# increments i by 1 each iteration from 0 to 99
for ((i = 0 ; i < 100 ; i++)); do
  echo $i
done

# increments i by 5 each iteration from 5 to 50
for i in {5..50..5}; do
    echo "Welcome $i"
done

# iterates over every file in /etc/ that matches the format rc.* where * can be any string.
for i in /etc/rc.*; do
  echo $i
done

# iterates while the condition is true (in this case forever)
while true; do
  ···
done
```

## I/O (input/output)
Get input with read name_of_variable.
```
read ans
echo $ans
```
Use | (pipe operator) to use the output of the first command as the input of the second.
```
# sort sorts whatever it is given as input
# cat outputs the contents of a file
# this code sorts the contents of hi.txt
cat hi.txt | sort
```
Use > to change the output destination.
```
python hello.py > output.txt   # stdout to (file)
python hello.py >> output.txt  # stdout to (file), append
python hello.py 2> error.log   # stderr to (file)
python hello.py 2>&1           # stderr to stdout
python hello.py 2>/dev/null    # stderr to (null)
python hello.py &>/dev/null    # stdout and stderr to (null)
```




