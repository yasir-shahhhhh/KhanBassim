import os
import re

root_dir = r"c:\Users\ptc\OneDrive\Desktop\bassim"
html_files = [f for f in os.listdir(root_dir) if f.endswith('.html')]

# Match <a href="team-moments.html">Team</a> followed by <a href="team-moments.html">Moments</a> with any spacing/newlines
target_pattern = re.compile(
    r'<a\s+href="team-moments\.html">Team</a>\s*\n\s*<a\s+href="team-moments\.html">Moments</a>',
    re.IGNORECASE
)

replacement = '<a href="team-moments.html">Team Moments</a>'

modified_count = 0

for file_name in html_files:
    file_path = os.path.join(root_dir, file_name)
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        # Standardize newlines for matching
        normalized_content = content.replace('\r\n', '\n')
        
        if target_pattern.search(normalized_content):
            new_content = target_pattern.sub(replacement, normalized_content)
            # Restore CRLF newlines if the original had them
            if '\r\n' in content:
                new_content = new_content.replace('\n', '\r\n')
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {file_name}")
            modified_count += 1
    except Exception as e:
        print(f"Error processing {file_name}: {e}")

print(f"Total files updated: {modified_count}")
