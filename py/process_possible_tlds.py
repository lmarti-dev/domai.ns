import io
import json
from wordfreq import word_frequency


def get_list(fpath: str) -> list:
    return (
        io.open(
            fpath,
            "r",
            encoding="utf8",
        )
        .read()
        .split("\n")
    )


tlds = get_list(
    r"c:\Users\Moi4\Desktop\code\web\cool_domains\files\tlds\all_no_brand.txt"
)

words = get_list(
    r"c:\Users\Moi4\Desktop\code\web\cool_domains\files\words\words_all_en.txt"
)

d = {}

for tld in tlds:
    for w in words:
        if w.endswith(tld) and w != tld:
            if tld not in d.keys():
                d[tld] = []
            d[tld].append(w)


for k in d:
    print(k)
    if len(d[k]) > 1:
        d[k] = list(sorted(d[k], key=lambda e: -word_frequency(e, "en")))
        with io.open(
            rf"c:\Users\Moi4\Desktop\code\web\cool_domains\files\dict\{k}.txt",
            "w+",
            encoding="utf8",
        ) as out:
            out.write("\n".join(d[k]))
