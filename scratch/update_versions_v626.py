import os

directory = r"c:\Users\ptc\OneDrive\Desktop\bassim"

# Update sw.js
sw_path = os.path.join(directory, "sw.js")
with open(sw_path, 'r', encoding='utf-8') as f:
    sw_content = f.read()

sw_content = sw_content.replace("baasim-portfolio-v6.2.5", "baasim-portfolio-v6.2.6")
sw_content = sw_content.replace("v=6.2.5", "v=6.2.6")

with open(sw_path, 'w', encoding='utf-8') as f:
    f.write(sw_content)
print("Updated sw.js successfully.")

# Update all HTML files
for filename in os.listdir(directory):
    if filename.endswith(".html"):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        has_changes = False
        if "v=6.2.5" in content:
            content = content.replace("v=6.2.5", "v=6.2.6")
            has_changes = True
            
        if has_changes:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {filename} successfully.")
