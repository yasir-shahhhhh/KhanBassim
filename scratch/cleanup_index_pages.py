import os
import re

root_dir = r"c:\Users\ptc\OneDrive\Desktop\bassim"
target_files = ['index.html', 'final-index.html', 'live-index.html']

# Regex to match the hero-buttons div block (with any whitespace/newlines)
buttons_pattern = re.compile(
    r'<div\s+id="unmute-hint".*?</div>\s*</div>|'
    r'<div\s+class="hero-buttons".*?</div>\s*</div>\s*</div>',
    re.DOTALL
)

# A more robust regex that specifically captures the outer <div class="hero-buttons"> block
hero_buttons_pattern = re.compile(
    r'<div\s+class="hero-buttons".*?<!--\s*unmute-hint\s*-->.*?</div>\s*</div>|'
    r'<div\s+class="hero-buttons".*?<\/div>\s*<\/div>\s*<\/div>|'
    r'<div\s+class="hero-buttons".*?<\/div>\s*<\/div>',
    re.DOTALL
)

# Regex to match the footer block
footer_pattern = re.compile(
    r'<footer>.*?</footer>',
    re.DOTALL
)

for file_name in target_files:
    file_path = os.path.join(root_dir, file_name)
    if not os.path.exists(file_path):
        continue
    
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        # 1. Replace metadata description
        content = content.replace(
            "Strategic execution and leadership portfolio of Basim Khan (Khan Basim). Chief Operating Officer (COO) at Proteios Education in Kashmir.",
            "Official portfolio of Basim Khan (Khan Basim), Chief Operating Officer (COO) at Proteios Education in Kashmir."
        )
        
        # 2. Delete footer
        content = footer_pattern.sub('', content)
        
        # 3. Delete hero buttons block
        # Let's use string find and replace for absolute safety if regex is too complex
        # Let's locate the hero-buttons div
        start_idx = content.find('<div class="hero-buttons"')
        if start_idx != -1:
            # Find the closing tag
            # We know the block ends after the <div id="unmute-hint"> ... </div> and a closing </div>
            end_search_str = 'Tap anywhere for sound\n                    </div>\n                </div>'
            end_idx = content.find(end_search_str, start_idx)
            if end_idx != -1:
                end_idx += len(end_search_str)
                # Remove the block
                content = content[:start_idx] + content[end_idx:]
                print(f"Removed hero buttons by index search in {file_name}")
            else:
                # Try another layout representation if spaces or quotes differ
                # We can replace the standard block directly
                block = content[start_idx:start_idx+1000]
                # count matching divs to find closing tag
                div_count = 0
                idx = start_idx
                while idx < len(content):
                    if content[idx:idx+4] == '<div':
                        div_count += 1
                        idx += 4
                    elif content[idx:idx+6] == '</div':
                        div_count -= 1
                        idx += 6
                        if div_count == 0:
                            content = content[:start_idx] + content[idx:]
                            print(f"Removed hero buttons by matching divs in {file_name}")
                            break
                    else:
                        idx += 1
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Successfully cleaned up {file_name}")
            
    except Exception as e:
        print(f"Error cleaning {file_name}: {e}")

print("Index pages cleanup complete.")
