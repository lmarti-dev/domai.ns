import io


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


tlds = get_list(r"c:\Users\Moi4\Desktop\code\web\cool_domains\files\tlds\all.txt")

brand = get_list(r"c:\Users\Moi4\Desktop\code\web\cool_domains\files\tlds\brand.txt")

tlds = [t for t in tlds if t not in brand]

with io.open(
    r"c:\Users\Moi4\Desktop\code\web\cool_domains\files\tlds\all_no_brand.txt",
    "w+",
    encoding="utf8",
) as out:
    out.write("\n".join(tlds))
