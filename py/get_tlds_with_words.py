import os
import io
from pathlib import Path

files = os.listdir(r"C:\Users\Moi4\Desktop\code\web\cool_domains\files\dict")

files = [Path(f).stem for f in files]


with io.open(
    r"C:\Users\Moi4\Desktop\code\web\cool_domains\files\tlds\with_words.txt",
    "w+",
    encoding="utf8",
) as out:
    out.write("\n".join(files))
