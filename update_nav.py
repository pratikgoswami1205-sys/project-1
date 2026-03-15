import os
import glob
import re

nav_items = [
    ("index.html", "Home"),
    ("tools.html", "Tools"),
    ("notes.html", "Study Notes"),
    ("papers.html", "Previous Papers"),
    ("planner.html", "Study Planner"),
    ("profile.html", "Profile"),
    ("contact.html", "Contact")
]

for filepath in glob.glob("d:/Brainblast/student-helper-hub/*.html"):
    filename = os.path.basename(filepath)
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    new_nav = '        <ul class="nav-links">\n'
    for link_href, link_text in nav_items:
        active_class = ' class="active"' if link_href == filename else ''
        new_nav += f'            <li><a href="{link_href}"{active_class}>{link_text}</a></li>\n'
    new_nav += '        </ul>'
    
    pattern = re.compile(r'        <ul class="nav-links">.*?        </ul>', re.DOTALL)
    new_content = pattern.sub(new_nav, content)
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)
        
print("Nav updated to match exact prompt requirements")
