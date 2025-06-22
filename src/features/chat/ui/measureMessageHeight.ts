export function measureMessageHeight(
  text: string,
  {
    maxWidth = 400,
    padding = 12,
    fontSize = 14,
    lineHeight = 20,
    metadataHeight = 16,
  } = {}
): number {
  const div = document.createElement("div");
  div.style.position = "absolute";
  div.style.visibility = "hidden";
  div.style.pointerEvents = "none";
  div.style.left = "-9999px";
  div.style.top = "-9999px";
  div.style.width = maxWidth + "px";
  div.style.fontSize = fontSize + "px";
  div.style.lineHeight = lineHeight + "px";
  div.style.whiteSpace = "pre-wrap";
  div.style.wordBreak = "break-word";
  div.style.padding = `${padding}px`;
  div.style.maxWidth = maxWidth + "px";
  div.style.boxSizing = "border-box";
  div.style.background = "transparent";
  div.style.margin = "0";

  div.innerHTML = ` <span class="text-sm" style="margin:0;">${text}</span>
    <div class="flex items-center gap-2" style="height:${metadataHeight}px;"></div>`;
  document.body.appendChild(div);
  const height = div.offsetHeight;
  document.body.removeChild(div);
  return height;
}
