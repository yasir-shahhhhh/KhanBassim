import os

root_dir = r"c:\Users\ptc\OneDrive\Desktop\bassim"
html_files = [f for f in os.listdir(root_dir) if f.endswith('.html')]
all_files = html_files + ['sw.js']

old_version = "6.0.0"
new_version = "6.0.1"

modified_count = 0

for file_name in all_files:
    file_path = os.path.join(root_dir, file_name)
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        has_changes = False
        if f"v={old_version}" in content:
            content = content.replace(f"v={old_version}", f"v={new_version}")
            has_changes = True
        if f"portfolio-v{old_version}" in content:
            content = content.replace(f"portfolio-v{old_version}", f"portfolio-v{new_version}")
            has_changes = True
            
        if has_changes:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Bumped version in {file_name}")
            modified_count += 1
    except Exception as e:
        print(f"Error processing {file_name}: {e}")

print(f"Total files updated: {modified_count}")
