import os
import glob

old_footer = """    <footer style="padding: 6rem 6%; text-align: center; border-top: 1px solid var(--glass-border); background: var(--bg-card); backdrop-filter: blur(10px);">
        <p style="color: var(--text-muted);">&copy; 2026 HelperHub. Designed for the students of the future.</p>
    </footer>"""

new_footer = """    <footer style="padding: 6rem 6%; text-align: center; border-top: 1px solid var(--glass-border); background: var(--bg-card); backdrop-filter: blur(10px);">
        <div style="display: flex; justify-content: center; gap: 1.5rem; margin-bottom: 2rem;">
            <a href="https://github.com/pratikgoswami1205-sys" target="_blank" style="color: var(--text-muted); font-size: 1.5rem; transition: var(--transition);" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-muted)'"><i class="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/pratik-giri-6382153b0" target="_blank" style="color: var(--text-muted); font-size: 1.5rem; transition: var(--transition);" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-muted)'"><i class="fab fa-linkedin-in"></i></a>
        </div>
        <p style="color: var(--text-main); font-weight: 600; margin-bottom: 0.5rem;">Developed with <i class="fas fa-heart" style="color: #ff4757;"></i> by Pratik Giri</p>
        <p style="color: var(--text-muted); font-size: 0.9rem;">&copy; 2026 HelperHub. Designed for the students of the future.</p>
    </footer>"""

for file in glob.glob("d:/Brainblast/student-helper-hub/*.html"):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Try both newline formats
    content = content.replace(old_footer, new_footer)
    content = content.replace(old_footer.replace('\n', '\r\n'), new_footer)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
print("Updated all footers!")
