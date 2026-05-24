import os

root_dir = r"c:\Users\ptc\OneDrive\Desktop\bassim"
html_files = [f for f in os.listdir(root_dir) if f.endswith('.html')]
all_files = html_files + ['main-v5.js']

old_link = "https://www.linkedin.com/in/baasim-fayaz-khan-b20970258/"
new_link = "https://www.linkedin.com/in/khan-baasim-41b055408"

modified_count = 0

for file_name in all_files:
    file_path = os.path.join(root_dir, file_name)
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        if old_link in content:
            new_content = content.replace(old_link, new_link)
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated LinkedIn link in {file_name}")
            modified_count += 1
    except Exception as e:
        print(f"Error processing {file_name}: {e}")

print(f"Total files updated: {modified_count}")
