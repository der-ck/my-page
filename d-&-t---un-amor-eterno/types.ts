
export type ActiveCard = 'general' | 'D' | 'T' | null;

export interface CardProps {
  title?: string;
  content: string;
  onClose: () => void;
  isOpen: boolean;
}
