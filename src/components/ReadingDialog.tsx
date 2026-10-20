import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

export function ReadingDialog({ title, paragraphs, onClose }: { title: string | null; paragraphs: readonly string[]; onClose: () => void }) {
  return <Dialog open={title !== null} onOpenChange={(open) => { if (!open) onClose(); }}>
    <DialogContent className="max-h-[85dvh] max-w-[calc(100%-2rem)] overflow-y-auto rounded-lg sm:max-w-2xl">
      <DialogTitle className="pr-5 text-xl leading-normal">{title}</DialogTitle>
      <DialogDescription>Nexus learning notes · Indian product teams</DialogDescription>
      <div className="space-y-5">{paragraphs.map((p, index) => <p key={index} className="text-sm leading-relaxed">{p}</p>)}</div>
    </DialogContent>
  </Dialog>;
}