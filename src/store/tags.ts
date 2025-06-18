import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { tagApi } from '@/api/tags';
import type { TagResponse, TagRequest } from '@/types';

export const useTagStore = defineStore('tags', () => {
  // State
  const tags = ref<TagResponse[]>([]);
  const isLoading = ref(false);
  const error = ref<string>('');

  // Getters
  const tagMap = computed(() => {
    const map = new Map<number, TagResponse>();
    tags.value.forEach(tag => map.set(tag.id, tag));
    return map;
  });

  const getTagById = computed(() => (id: number) => tagMap.value.get(id));

  const availableColors = [
    '#fecaca', '#fed7aa', '#fef3c7', '#d9f99d', '#a7f3d0',
    '#a5f3fc', '#bfdbfe', '#c4b5fd', '#f0abfc', '#e5e7eb'
  ];

  const usedColors = computed(() => 
    tags.value.map(tag => tag.color)
  );

  const unusedColors = computed(() => 
    availableColors.filter(color => !usedColors.value.includes(color))
  );

  // Actions
  const fetchTags = async () => {
    try {
      isLoading.value = true;
      error.value = '';
      const data = await tagApi.getTags();
      tags.value = data;
    } catch (err) {
      error.value = err instanceof Error ? err.message : '載入標籤失敗';
      console.error('Failed to fetch tags:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const createTag = async (tagData: TagRequest) => {
    try {
      isLoading.value = true;
      error.value = '';
      const newTag = await tagApi.createTag(tagData);
      tags.value.push(newTag);
      return newTag;
    } catch (err) {
      error.value = err instanceof Error ? err.message : '建立標籤失敗';
      console.error('Failed to create tag:', err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const updateTag = async (id: number, tagData: TagRequest) => {
    try {
      isLoading.value = true;
      error.value = '';
      const updatedTag = await tagApi.updateTag(id, tagData);
      const index = tags.value.findIndex(tag => tag.id === id);
      if (index !== -1) {
        tags.value[index] = updatedTag;
      }
      return updatedTag;
    } catch (err) {
      error.value = err instanceof Error ? err.message : '更新標籤失敗';
      console.error('Failed to update tag:', err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteTag = async (id: number) => {
    try {
      isLoading.value = true;
      error.value = '';
      await tagApi.deleteTag(id);
      tags.value = tags.value.filter(tag => tag.id !== id);
    } catch (err) {
      error.value = err instanceof Error ? err.message : '刪除標籤失敗';
      console.error('Failed to delete tag:', err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const clearError = () => {
    error.value = '';
  };

  // WebSocket sync methods (to be implemented)
  const initSync = () => {
    // TODO: Implement WebSocket subscription
    console.log('Tag WebSocket sync initialized');
  };

  const teardownSync = () => {
    // TODO: Implement WebSocket cleanup
    console.log('Tag WebSocket sync torn down');
  };

  const handleTagNotification = (notification: any) => {
    // TODO: Handle WebSocket notifications
    console.log('Tag notification received:', notification);
  };

  return {
    // State
    tags,
    isLoading,
    error,
    
    // Getters
    tagMap,
    getTagById,
    availableColors,
    usedColors,
    unusedColors,
    
    // Actions
    fetchTags,
    createTag,
    updateTag,
    deleteTag,
    clearError,
    initSync,
    teardownSync,
    handleTagNotification
  };
}); 