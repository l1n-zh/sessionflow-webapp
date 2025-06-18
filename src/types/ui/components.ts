// Component Props Types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'dimmed';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
}

export interface TagProps {
  id?: number;
  name: string;
  color: string;
  removable?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export interface ModalProps {
  show: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface IconProps {
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export interface ActionButtonProps {
  icon?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
} 