import { ref, computed, watch } from 'vue';
import type { TaskResponse, TaskFormData } from '@/types';

export function useTaskForm(task?: TaskResponse) {
  // Form data
  const formData = ref<TaskFormData>({
    title: '',
    tagIds: [],
    dueTime: '',
    note: ''
  });

  // Form validation
  const errors = ref<Record<string, string>>({});

  const isEdit = computed(() => !!task);

  const isFormValid = computed(() => {
    return formData.value.title.trim().length > 0 && Object.keys(errors.value).length === 0;
  });

  // Methods
  const validateForm = () => {
    errors.value = {};
    
    if (!formData.value.title.trim()) {
      errors.value.title = '請輸入任務標題';
    } else if (formData.value.title.length > 255) {
      errors.value.title = '標題不能超過 255 字元';
    }
    
    if (formData.value.note && formData.value.note.length > 2000) {
      errors.value.note = '備註不能超過 2000 字元';
    }
    
    if (formData.value.dueTime) {
      const dueDate = new Date(formData.value.dueTime);
      if (dueDate < new Date()) {
        errors.value.dueTime = '截止日期不能早於現在';
      }
    }
  };

  const handleSubmit = (onSubmit: (data: TaskFormData) => void) => {
    validateForm();
    
    if (Object.keys(errors.value).length === 0) {
      const submitData: TaskFormData = {
        title: formData.value.title.trim(),
        tagIds: formData.value.tagIds,
        dueTime: formData.value.dueTime || undefined,
        note: formData.value.note?.trim() || undefined
      };
      
      onSubmit(submitData);
    }
  };

  // Initialize form data
  const initializeForm = () => {
    if (task) {
      formData.value = {
        title: task.title,
        tagIds: task.tags.map(tag => tag.id),
        dueTime: task.dueTime ? new Date(task.dueTime).toISOString().slice(0, 16) : '',
        note: task.note || ''
      };
    } else {
      formData.value = {
        title: '',
        tagIds: [],
        dueTime: '',
        note: ''
      };
    }
    errors.value = {};
  };

  // Watch for task changes
  watch(() => task, initializeForm, { immediate: true });

  return {
    formData,
    errors,
    isEdit,
    isFormValid,
    validateForm,
    handleSubmit,
    initializeForm
  };
} 