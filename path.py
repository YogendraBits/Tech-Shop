import os

def print_directory_tree(path, ignore_folders=None, indent=''):
    if ignore_folders is None:
        ignore_folders = []

    # List all items in the current directory
    items = os.listdir(path)
    items.sort()  # Sort to have a consistent order

    for item in items:
        # Full path to the item
        full_path = os.path.join(path, item)

        # Check if the item is a directory and should be ignored
        if os.path.isdir(full_path):
            if item in ignore_folders:
                continue  # Skip ignored folders

            print(indent + '├── ' + item)  # Print the folder name
            # Recur into the directory
            print_directory_tree(full_path, ignore_folders, indent + '│   ')
        else:
            print(indent + '├── ' + item)  # Print the file name

# Set the current directory and ignored folders
current_directory = os.getcwd()
ignored_folders = ['node_modules','.git']

# Print the directory tree
print_directory_tree(current_directory, ignore_folders=ignored_folders)
