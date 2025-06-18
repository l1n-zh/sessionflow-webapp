export const formatDueDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return `逾期 ${Math.abs(diffDays)} 天`;
  } else if (diffDays === 0) {
    return '今天到期';
  } else if (diffDays === 1) {
    return '明天到期';
  } else {
    return `${diffDays} 天後到期`;
  }
};

export const formatCompletedDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-TW', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}; 