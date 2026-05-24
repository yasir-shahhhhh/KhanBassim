import os

root_dir = r"c:\Users\ptc\OneDrive\Desktop\bassim"
html_files = [f for f in os.listdir(root_dir) if f.endswith('.html')]
all_files = html_files + ['sw.js']

modified_count = 0

for file_name in all_files:
    file_path = os.path.join(root_dir, file_name)
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        if '5.9.8' in content:
            new_content = content.replace('5.9.8', '5.9.9')
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Bumped version in {file_name}")
            modified_count += 1
    except Exception as e:
        print(f"Error processing {file_name}: {e}")

print(f"Total files bumped: {modified_count}")
