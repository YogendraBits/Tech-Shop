import os

def read_files_to_txt(filenames, output_filename):
    # Get the current directory
    current_directory = os.getcwd()
    
    # Create or open the output text file
    with open(output_filename, 'w', encoding='utf-8') as output_file:
        found_files = {}  # Dictionary to keep track of found files
        
        # Walk through all directories and subdirectories
        for root, _, files in os.walk(current_directory):
            for filename in files:
                # Check if the current file is in the list of filenames to find
                if filename in filenames:
                    file_path = os.path.join(root, filename)
                    found_files[filename] = file_path

                    # Read the content of the file
                    with open(file_path, 'r', encoding='utf-8') as input_file:
                        content = input_file.read()
                        # Write the filename and its content to the output file
                        output_file.write(f"=== Content of {filename} ===\n")
                        output_file.write(content + "\n\n")

        # Check if any files were not found
        for filename in filenames:
            if filename not in found_files:
                print(f"File '{filename}' not found in directory or subdirectories.")

# Example usage
file_list = ['wishlistControllers.js', 'wishlistModel.js', 'wishlistRoutes.js', 'server.js']  # List of files you want to read
output_file_name = 'combined_output.txt'  # Output file name

read_files_to_txt(file_list, output_file_name)
print(f"Content from specified files has been written to '{output_file_name}'.")
