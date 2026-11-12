import {
  Attachment,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "oamui/ui/attachment";
import type { ReactNode } from "react";

type OamUiAttachmentProps = {
  title: ReactNode;
  description?: ReactNode;
  // File-type icon (or an image when mediaVariant is "image")
  media?: ReactNode;
  mediaVariant?: "icon" | "image";
  actions?: ReactNode;
  className?: string;
};

// File card: icon, name, size and actions
export function OamUiAttachment({ title, description, media, mediaVariant, actions, className }: OamUiAttachmentProps) {
  return (
    <Attachment className={className}>
      {media && <AttachmentMedia variant={mediaVariant}>{media}</AttachmentMedia>}
      <AttachmentContent>
        <AttachmentTitle>{title}</AttachmentTitle>
        {description && <AttachmentDescription>{description}</AttachmentDescription>}
      </AttachmentContent>
      {actions && <AttachmentActions>{actions}</AttachmentActions>}
    </Attachment>
  );
}
