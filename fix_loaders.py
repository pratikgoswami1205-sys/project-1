import glob
import os

loader_html = """    <!-- Loading Screen -->
    <div class="loader-wrapper">
        <i class="fas fa-graduation-cap loader-logo"></i>
        <div class="loader-progress-container">
            <div class="loader-progress-bar"></div>
        </div>
    </div>"""

for filepath in glob.glob("d:/Brainblast/student-helper-hub/*.html"):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    if '<div class="loader-wrapper">' not in content:
        # Inject after <body> tag
        new_content = content.replace("<body>", "<body>\n" + loader_html)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Added loader to {os.path.basename(filepath)}")
    else:
        print(f"Loader already in {os.path.basename(filepath)}")
