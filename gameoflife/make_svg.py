

def single_rect(x,y):
    return f'<rect id="{x}{y}" x="{x}" y="{y}" width="1" height="1" style="fill: rgb(216, 216, 216);"></rect>'


#  <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
#   <defs></defs>
#   <rect x="68.989" y="49.558" width="5.525" height="3.74" style="fill: rgb(216, 216, 216);"></rect>
# </svg>

def make_rectangle_svg(x,y):
    rects = "\n".join(single_rect(i,j) for i in range(x) for j in range(y))

    return f"""<svg viewBox="0 0 {x} {y}" xmlns="http://www.w3.org/2000/svg">
    <defs></defs>
    {rects}
    </svg>
    """

if __name__ == "__main__":
    x, y = 100, 100
    with open(f"gameoflife/{x}x{y}_rect.svg","w") as f:
        f.write(make_rectangle_svg(x,y))