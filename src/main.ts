import { TextFileView, Plugin, TFile } from "obsidian";

export default class Klog extends Plugin {
  async onload() {
    this.registerView("klog", (l) => new KlogView(l));
    this.registerExtensions(["klg"], "klog");
  }

  onunload() {}
}

class KlogView extends TextFileView {
  // #filename = "klog";
  // #content = "";
  sourceEl = this.contentEl.createDiv({ cls: "klog-view" });
  // @ts-expect-error
  editor = CodeMirror.fromTextArea(
    this.sourceEl.createEl("textarea", { cls: "klog-editor" }),
    {
      lineNumbers: (this.app.vault as any).getConfig("showLineNumber"),
      lineWrapping: true,
      // @ts-expect-error
      scrollbarStyle: null,
      keyMap: "default",
      theme: "obsidian",
    }
  );

  getViewType() {
    return "klog";
  }

  getIcon() {
    return "timer";
  }

  getDisplayText() {
    return this.file?.name || "Klog (no file)";
  }

  canAcceptExtension(extension: string) {
    return extension === "klg";
  }

  onload() {
    this.editor.on("change", () => this.requestSave());
  }

  getViewData() {
    this.data = this.editor.getValue();
    return this.data;
  }

  setViewData(data: string, clear: boolean) {
    this.data = data;

    if (clear) {
      // @ts-expect-error
      this.editor.swapDoc(CodeMirror.Doc(data, "text/x-klog"));
      this.editor.clearHistory();
    }

    this.editor.setValue(data);
  }

  clear(): void {
    this.editor.setValue("");
    this.editor.clearHistory();
    this.data = null as any;
  }

  onResize() {
    this.editor.refresh();
  }
}
