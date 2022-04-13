
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

# VSCode
Alright! Now we're going to be moving on the the VSCode portion of the workshop.

## What is a code editor?
Lets start with what a code editor actually is. A code editor is a text editor program that is specifically made for editing the source code of programs, meaning that it is specialized for writing software.

## What is VSCode, and why are we talking about it?
Now that we know this, we can move on to what VSCode is, and why we're talking about it! VSCode (Visual Studio Code) is a code editor that provides developers a streamlined experience, and it is full of a bunch of really useful operations. You will soon learn that knowing VSCode can make your coding life much easier. It is important to note that there are other code editors out there that you can choose from, but VSCode is one of the most popular and widely used, so we figured it would be a great one to start out with.

Here are some of the basic barebones of VSCode:

* New file: File > New File (⌘N)
* Save a file: File > Save (⌘S)
* Open file/folder: File > Open… (⌘S)
* Open the Command Palette (provides access to all commands and other VSCode features):
   * View > Command Palette…(⇧⌘P)
* See an overview of the user interface:
   * Go to the command palette > Help: User Interface Overview
* Open the Interactive Editor Playground, where you can explore VS Code features:
   * Help > Editor Playground
* You can also change your color theme by going to File (Code on MacOS) > Preferences > Color Theme (⌘K⌘T).

*Show changing color theme*

## Keyboard Shortcuts
The next important part of VSCode to discuss is its keyboard shortcuts. VSCode provides a lot of keyboard shortcuts, too many to remember all at once. Luckily, VSCode provides a Keyboard Shortcuts editor that can be accessed through File (Code on MacOS) > Preferences > Keyboard Shortcuts (⌘K⌘S). You can also find a printable keyboard shortcuts cheat sheet through Help > Keyboard Shortcuts Reference (⌘K⌘R).

## Editing VSCode Keyboard Shortcuts
Wait, did you hear me say editor? Yup! VSCode also allows you to change the existing keybindings and add new ones. You can do this by going to Keyboard Shortcuts (⌘K⌘S) and clicking the paper icon with an arrow in the top right. This will open the Keyboard Shortcuts JSON file, where keyboard shortcuts can be added. From there, click in the bottom right the button that says "Define Keybinding", and type in the keys you want. From there, your keybinding can be added, and you can change the command section to the command you want the keybinding to be and add a condition if you want.

You can also change existing shortcuts in the keyboard shortcuts editor by just clicking them and typing in a new shortcut.

*Show adding a shortcut*

## Migrating Shortcuts
You can also migrate shortcuts from other editors by installing their keymap extensions: File (Code on MacOS) > Preferences > Migrate Keyboard Shortcuts from…

## Extensions
This leads us to our next topic, extensions. VSCode has countless extensions that allow you to add features such as languages, debuggers, and other tools that can help you with your development. You can browse and install extensions by clicking to left icon with 4 squares, or going to View > Extensions (⇧⌘X). Once an extension is installed, click the gear to see options regarding it like enabling and disabling.

## Common Extensions
You can also find popular extensions by typing @popular into the extension marketplace search bar.

## Debugging Within VSCode
Now, our next important VSCode topic is debugging. VSCode has built in debugging for Javascript, and there are debugger extensions for other languages as well. You can use the Run menu at the top to access the most commonly used run and debug commands. For example, to run while debugging, select "Run and Debug", and to just run the program, select "Run". Once you are debugging, everything you need for step by step code inspection starts with the debug toolbar, which includes options to continue, step over, step into, step out of, restart, and stop. You can set breakpoints by clicking on the editor margin, which will show up as a red circle. You can also inspect the variables and their current values on the left side in the Variables section of the run view.

## Integrated Terminal
Another great feature VSCode has is the ability to open an integrated terminal that opens in the root directory of your workspace. You can add a second terminal and can also select different shells to use when adding depending on which shell profiles are loaded onto your computer.

Brief demo in person:

Open command palette (⇧⌘P), see overview of user interface (Go to the command palette > Help: User Interface Overview), open interactive editor playground (Help > Editor Playground), Download Microsoft C++ extension, open file, open integrated terminal, show autocomplete and syntax highlighting of extension, compile and run file in integrated terminal.

## Settings and Code Editor Configurations
Now, we will talk about VSCode settings, and configuring your code editor for success. You can get to setting on VSCode by going to File (Code on MacOS) > Preferences > Settings (⌘,). You can configure your extensions and settings from scratch, but many people have spent lots of time figuring out different ways to optimize their code editor, so there are many preexisting methods and existing configurations out there. Here is a good article that I really liked that walks you through completely setting up your VSCode: VSCode Configuration Article

## Git Within VSCode
One of the very most important features of VSCode is its integrated source control, meaning that you can do many Git operations within VSCode, instead of having to do them in a terminal outside of your code editor. The third icon from the top on the left menu is the Source Control icon, and it shows the details of your current repository changes. VSCode uses your machine's Git installation, so make sure you have Git installed.

## Using Git Within VSCode
In the source control menu, there will be a list of files. Clicking each tiem shows the textual changes within each file, and for unstaged changes, you can still edit this file from within the source control window, without having to go back up. Also keep in mind that the icons in the bottom left of the view designate the current branch, dirty indicators (which are not important as of now), and the number of ingoing/outgoing commits of the current branch.

## Staging and Committing
To stage a file for committing, click the plus next to the file. To commit the file, type a commit message in the message box above the staged changes and commit with Cntrl(command for Mac)-Enter, or click the checkmark. If you want to undo the last commmit, click the three dots (Views and More Actions) > Commit > Undo Last Commit.

## Cloning A Repository
Another great aspect of using Git with VSCode is that before you open a folder, you can also clone a repository. Click the clone repository button, and enter the URL of the remote repo that you want to clone, which can be obtained from that repo's GitHub page.

## Branching
You can also create and checkout branches through VSCode commands. Go to the Command Palette, and select "Git: Create Branch" or "Git: Checkout To" commands. Or, if you click the current branch area in the bottom left, it will open up the same menu as "Git: Checkout To", where it provides options to checkout another branch or create a new branch, among some other options.

## Remote Repository Operations
Finally, if your repository is connected to a remote, and your branch has an upstream link to a branch in that remote, you need to be able to push and pull from that repository. Luckily, through clicking Views and More Actions (the three dots), VSCode provides options to push, pull, and sync that branch.

## Remote SSH Within VSCode
Now, the final feature of VSCode that we will talk about today is one of the most valuable, especially for students in UCLA's introductory computer science classes (CS31, CS32, etc.). This feature is the ability to connect to a remote host, such as SEASNet, from within VSCode. First, we must install the Remote Development extension pack. From there, go to the Command Palette, and select "Remote-SSH: Connect To Host". You will be prompted for a user@hostname address, so use the one you normally use to ssh in with the terminal. Then, type in your password and from there you will be connected. After being connected, you will be able to open files and folders as normal, without having to use Linux commands, making it much easier to see your entire file system. If you forget that you are logged in, you can always look down at the status bar to see which host you are connected to.

Demo installing the extension and ssh'ing in

And that is all for VSCode! I hope that this brief tutorial helped you become more familiar with this code editor and that next time you code it will be a little bit easier.


