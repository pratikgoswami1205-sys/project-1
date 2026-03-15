import glob
import os

emergency_script = """    <script>
        // Emergency loader killer
        setTimeout(() => {
            const loader = document.querySelector('.loader-wrapper');
            if (loader && !loader.classList.contains('fade-out')) {
                loader.style.display = 'none';
                document.body.classList.remove('page-entering');
            }
        }, 3000);
    </script>"""

for filepath in glob.glob("d:/Brainblast/student-helper-hub/*.html"):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    if "Emergency loader killer" not in content:
        # Inject before loader or after body
        if '<body>' in content:
            new_content = content.replace('<body>', '<body class="dark">\n' + emergency_script)
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Added emergency script to {os.path.basename(filepath)}")
        elif '<body class="dark">' in content:
             new_content = content.replace('<body class="dark">', '<body class="dark">\n' + emergency_script)
             with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
             print(f"Added emergency script to {os.path.basename(filepath)}")

print("Done")
