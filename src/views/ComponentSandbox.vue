<template>
  <div class="bg-stone-100 overflow-y-auto">
    <!-- Header -->
    <div class="bg-white border-b border-neutral-300 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <h1 class="text-2xl font-bold text-neutral-900">Component Sandbox</h1>
          <div class="flex items-center gap-4">
            <select 
              v-model="selectedCategory" 
              class="px-3 py-2 border border-neutral-300 rounded-lg bg-white"
            >
              <option value="all">所有元件</option>
              <option value="atoms">Atoms</option>
              <option value="molecules">Molecules</option>
              <option value="organisms">Organisms</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Navigation -->
      <div class="mb-8">
        <nav class="flex space-x-8">
          <button
            v-for="category in categories"
            :key="category.id"
            :class="[
              'pb-2 border-b-2 font-medium text-sm transition-colors',
              selectedCategory === category.id || selectedCategory === 'all'
                ? 'border-primary text-primary'
                : 'border-transparent text-neutral-500 hover:text-neutral-700'
            ]"
            @click="selectedCategory = category.id"
          >
            {{ category.name }}
          </button>
        </nav>
      </div>

      <!-- Atoms Section -->
      <section v-if="shouldShowCategory('atoms')" class="mb-16">
        <h2 class="text-3xl font-bold text-neutral-900 mb-8">Atoms</h2>
        
        <!-- BaseButton -->
        <ComponentSection title="BaseButton" description="基礎按鈕元件，支援多種變體和狀態">
          <div class="space-y-6">
            <!-- Variants -->
            <div>
              <h4 class="text-sm font-medium text-neutral-700 mb-3">變體 (Variants)</h4>
              <div class="flex flex-wrap gap-3">
                <BaseButton variant="primary">Primary</BaseButton>
                <BaseButton variant="secondary">Secondary</BaseButton>
                <BaseButton variant="danger">Danger</BaseButton>
                <BaseButton variant="dimmed">Dimmed</BaseButton>
              </div>
            </div>
            
            <!-- Sizes -->
            <div>
              <h4 class="text-sm font-medium text-neutral-700 mb-3">尺寸 (Sizes)</h4>
              <div class="flex items-center gap-3">
                <BaseButton size="sm">Small</BaseButton>
                <BaseButton size="md">Medium</BaseButton>
                <BaseButton size="lg">Large</BaseButton>
              </div>
            </div>
            
            <!-- States -->
            <div>
              <h4 class="text-sm font-medium text-neutral-700 mb-3">狀態 (States)</h4>
              <div class="flex flex-wrap gap-3">
                <BaseButton>Normal</BaseButton>
                <BaseButton :loading="true">Loading</BaseButton>
                <BaseButton :disabled="true">Disabled</BaseButton>
              </div>
            </div>
          </div>
        </ComponentSection>

        <!-- BaseInput -->
        <ComponentSection title="BaseInput" description="基礎輸入元件，支援多種類型和狀態">
          <div class="space-y-6 max-w-md">
            <!-- Types -->
            <div>
              <h4 class="text-sm font-medium text-neutral-700 mb-3">類型 (Types)</h4>
              <div class="space-y-3">
                <BaseInput placeholder="文字輸入" />
                <BaseInput type="email" placeholder="電子郵件" />
                <BaseInput type="password" placeholder="密碼" />
                <BaseInput type="datetime-local" />
                <BaseInput multiline placeholder="多行文字輸入" :rows="3" />
              </div>
            </div>
            
            <!-- States -->
            <div>
              <h4 class="text-sm font-medium text-neutral-700 mb-3">狀態 (States)</h4>
              <div class="space-y-3">
                <BaseInput placeholder="正常狀態" />
                <BaseInput placeholder="錯誤狀態" error="這是錯誤訊息" />
                <BaseInput placeholder="禁用狀態" :disabled="true" />
              </div>
            </div>
          </div>
        </ComponentSection>

        <!-- BaseTag -->
        <ComponentSection title="BaseTag" description="標籤元件，支援多種顏色和狀態">
          <div class="space-y-6">
            <!-- Colors -->
            <div>
              <h4 class="text-sm font-medium text-neutral-700 mb-3">顏色 (Colors)</h4>
              <div class="flex flex-wrap gap-2">
                <BaseTag 
                  v-for="(color, index) in tagColors" 
                  :key="index"
                  :name="`標籤 ${index + 1}`" 
                  :color="color" 
                />
              </div>
            </div>
            
            <!-- Sizes -->
            <div>
              <h4 class="text-sm font-medium text-neutral-700 mb-3">尺寸 (Sizes)</h4>
              <div class="flex items-center gap-2">
                <BaseTag name="Small" color="#fecaca" size="sm" />
                <BaseTag name="Medium" color="#fed7aa" size="md" />
                <BaseTag name="Large" color="#fef3c7" size="lg" />
              </div>
            </div>
            
            <!-- States -->
            <div>
              <h4 class="text-sm font-medium text-neutral-700 mb-3">狀態 (States)</h4>
              <div class="flex flex-wrap gap-2">
                <BaseTag name="只讀" color="#d9f99d" />
                <BaseTag name="可移除" color="#a7f3d0" removable @remove="() => {}" />
              </div>
            </div>
          </div>
        </ComponentSection>

        <!-- ActionButton -->
        <ComponentSection title="ActionButton" description="帶圖示的動作按鈕，支援三種變體">
          <div class="space-y-6">
            <!-- Variants -->
            <div>
              <h4 class="text-sm font-medium text-neutral-700 mb-3">變體 (Variants)</h4>
              <div class="flex flex-wrap gap-3">
                <ActionButton icon="add" variant="primary" />
                <ActionButton icon="edit" variant="secondary" />
                <ActionButton icon="delete" variant="outline" />
              </div>
            </div>
            
            <!-- Sizes -->
            <div>
              <h4 class="text-sm font-medium text-neutral-700 mb-3">尺寸 (Sizes)</h4>
              <div class="flex items-center gap-3">
                <ActionButton icon="search" size="sm" />
                <ActionButton icon="search" size="md" />
                <ActionButton icon="search" size="lg" />
              </div>
            </div>
            
            <!-- Icon Only -->
            <div>
              <h4 class="text-sm font-medium text-neutral-700 mb-3">僅圖示</h4>
              <div class="flex items-center gap-3">
                <ActionButton icon="edit" variant="primary" />
                <ActionButton icon="delete" variant="secondary" />
                <ActionButton icon="add" variant="outline" />
              </div>
            </div>
            
            <!-- States -->
            <div>
              <h4 class="text-sm font-medium text-neutral-700 mb-3">狀態 (States)</h4>
              <div class="flex flex-wrap gap-3">
                <ActionButton icon="save" />
                <ActionButton icon="save" :loading="true" />
                <ActionButton icon="save" :disabled="true" />
              </div>
            </div>
          </div>
        </ComponentSection>
      </section>

      <!-- Molecules Section -->
      <section v-if="shouldShowCategory('molecules')" class="mb-16">
        <h2 class="text-3xl font-bold text-neutral-900 mb-8">Molecules</h2>
        
        <!-- BaseCard -->
        <ComponentSection title="BaseCard" description="基礎卡片元件，支援標題、內容和動作區域">
          <div class="space-y-6 max-w-2xl">
            <!-- Variants -->
            <div>
              <h4 class="text-sm font-medium text-neutral-700 mb-3">變體 (Variants)</h4>
              <div class="space-y-4">
                <BaseCard title="預設卡片">
                  <p class="text-neutral-600">這是卡片的內容區域。</p>
                </BaseCard>
                
                <BaseCard title="帶動作的卡片" variant="elevated">
                  <p class="text-neutral-600">這是帶有動作按鈕的卡片。</p>
                  <template #actions>
                    <BaseButton variant="secondary" size="sm">取消</BaseButton>
                    <BaseButton size="sm">確認</BaseButton>
                  </template>
                </BaseCard>
                
                <BaseCard variant="outlined">
                  <template #header>
                    <div class="flex items-center gap-2">
                      <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span class="font-medium">自訂標題</span>
                    </div>
                  </template>
                  <p class="text-neutral-600">使用自訂標題插槽的卡片。</p>
                </BaseCard>
              </div>
            </div>
          </div>
        </ComponentSection>

        <!-- FormField -->
        <ComponentSection title="FormField" description="表單欄位元件，組合標籤和輸入框">
          <div class="space-y-6 max-w-md">
            <div>
              <h4 class="text-sm font-medium text-neutral-700 mb-3">基本用法</h4>
              <div class="space-y-4">
                <FormField
                  label="姓名"
                  v-model="sampleData.name"
                  placeholder="請輸入姓名"
                  required
                />
                <FormField
                  label="電子郵件"
                  type="email"
                  v-model="sampleData.email"
                  placeholder="請輸入電子郵件"
                  help="我們不會分享您的電子郵件"
                />
                <FormField
                  label="備註"
                  v-model="sampleData.note"
                  multiline
                  :rows="3"
                  placeholder="請輸入備註"
                />
                <FormField
                  label="錯誤示例"
                  v-model="sampleData.error"
                  placeholder="這個欄位有錯誤"
                  error="這是錯誤訊息"
                />
              </div>
            </div>
          </div>
        </ComponentSection>

        <!-- BaseModal -->
        <ComponentSection title="BaseModal" description="基礎彈窗元件">
          <div class="space-y-6">
            <div>
              <h4 class="text-sm font-medium text-neutral-700 mb-3">不同尺寸</h4>
              <div class="flex gap-3">
                <BaseButton @click="showModal('sm')">小型彈窗</BaseButton>
                <BaseButton @click="showModal('md')">中型彈窗</BaseButton>
                <BaseButton @click="showModal('lg')">大型彈窗</BaseButton>
                <BaseButton @click="showModal('xl')">超大彈窗</BaseButton>
              </div>
            </div>
          </div>
        </ComponentSection>
      </section>

      <!-- Organisms Section -->
      <section v-if="shouldShowCategory('organisms')" class="mb-16">
        <h2 class="text-3xl font-bold text-neutral-900 mb-8">Organisms</h2>
        
        <!-- TaskItem -->
        <ComponentSection title="TaskItem" description="任務項目元件">
          <div class="space-y-6 max-w-2xl">
            <div>
              <h4 class="text-sm font-medium text-neutral-700 mb-3">不同狀態</h4>
              <div class="space-y-4">
                <TaskItem 
                  :task="sampleTasks.pending"
                  @click="() => {}"
                  @edit="() => {}"
                  @delete="() => {}"
                  @toggle-complete="() => {}"
                />
                <TaskItem 
                  :task="sampleTasks.completed"
                  @click="() => {}"
                  @edit="() => {}"
                  @delete="() => {}"
                  @toggle-complete="() => {}"
                />
                <TaskItem 
                  :task="sampleTasks.withDueDate"
                  @click="() => {}"
                  @edit="() => {}"
                  @delete="() => {}"
                  @toggle-complete="() => {}"
                />
              </div>
            </div>
          </div>
        </ComponentSection>

        <!-- TaskList -->
        <ComponentSection title="TaskList" description="任務列表元件">
          <div class="space-y-6">
            <div>
              <h4 class="text-sm font-medium text-neutral-700 mb-3">不同狀態</h4>
              <div class="space-y-8">
                <!-- Normal state -->
                <div>
                  <h5 class="text-xs font-medium text-neutral-500 mb-2">正常狀態</h5>
                  <TaskList
                    :tasks="Object.values(sampleTasks)"
                    @create="() => {}"
                    @task-click="() => {}"
                    @task-edit="() => {}"
                    @task-delete="() => {}"
                    @task-toggle-complete="() => {}"
                  />
                </div>
                
                <!-- Loading state -->
                <div>
                  <h5 class="text-xs font-medium text-neutral-500 mb-2">載入狀態</h5>
                  <TaskList
                    :tasks="[]"
                    :is-loading="true"
                    @create="() => {}"
                    @task-click="() => {}"
                    @task-edit="() => {}"
                    @task-delete="() => {}"
                    @task-toggle-complete="() => {}"
                  />
                </div>
                
                <!-- Empty state -->
                <div>
                  <h5 class="text-xs font-medium text-neutral-500 mb-2">空狀態</h5>
                  <TaskList
                    :tasks="[]"
                    @create="() => {}"
                    @task-click="() => {}"
                    @task-edit="() => {}"
                    @task-delete="() => {}"
                    @task-toggle-complete="() => {}"
                  />
                </div>
              </div>
            </div>
          </div>
        </ComponentSection>

        <!-- Modals -->
        <ComponentSection title="Task Modals" description="任務相關彈窗元件">
          <div class="space-y-6">
            <div>
              <h4 class="text-sm font-medium text-neutral-700 mb-3">彈窗測試</h4>
              <div class="flex gap-3">
                <BaseButton @click="showTaskCreateModal = true">建立任務彈窗</BaseButton>
                <BaseButton @click="showTaskEditModal = true">編輯任務彈窗</BaseButton>
                <BaseButton @click="showTaskDeleteModal = true">刪除確認彈窗</BaseButton>
              </div>
            </div>
          </div>
        </ComponentSection>
      </section>
    </div>

    <!-- Test Modals -->
    <BaseModal
      :show="currentModal.show"
      :title="currentModal.title"
      :size="currentModal.size"
      @close="currentModal.show = false"
    >
      <p class="text-neutral-600">
        這是一個 {{ currentModal.size }} 尺寸的彈窗示例。
      </p>
      <template #footer>
        <BaseButton variant="secondary" @click="currentModal.show = false">取消</BaseButton>
        <BaseButton @click="currentModal.show = false">確認</BaseButton>
      </template>
    </BaseModal>

    <!-- Task Modals -->
    <TaskModal
      :show="showTaskCreateModal"
      @close="showTaskCreateModal = false"
      @submit="() => { showTaskCreateModal = false; }"
    />

    <TaskModal
      :show="showTaskEditModal"
      :task="sampleTasks.pending"
      @close="showTaskEditModal = false"
      @submit="() => { showTaskEditModal = false; }"
    />

    <TaskDeleteConfirm
      :show="showTaskDeleteModal"
      :task="sampleTasks.pending"
      @close="showTaskDeleteModal = false"
      @confirm="() => { showTaskDeleteModal = false; }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from '@/components/atoms/BaseButton.vue';
import BaseInput from '@/components/atoms/BaseInput.vue';
import BaseTag from '@/components/atoms/BaseTag.vue';
import ActionButton from '@/components/atoms/ActionButton.vue';
import BaseCard from '@/components/molecules/BaseCard.vue';
import FormField from '@/components/molecules/FormField.vue';
import BaseModal from '@/components/molecules/BaseModal.vue';
import ComponentSection from '@/components/molecules/ComponentSection.vue';
import TaskItem from '@/components/organisms/TaskItem.vue';
import TaskList from '@/components/organisms/TaskList.vue';
import TaskModal from '@/components/organisms/TaskModal.vue';
import TaskDeleteConfirm from '@/components/organisms/TaskDeleteConfirm.vue';
import type { TaskResponse } from '@/types';

// State
const selectedCategory = ref<string>('all');
const currentModal = ref({
  show: false,
  title: '',
  size: 'md' as 'sm' | 'md' | 'lg' | 'xl'
});

const showTaskCreateModal = ref(false);
const showTaskEditModal = ref(false);
const showTaskDeleteModal = ref(false);

const sampleData = ref({
  name: '',
  email: '',
  note: '',
  error: ''
});

// Categories
const categories = [
  { id: 'atoms', name: 'Atoms' },
  { id: 'molecules', name: 'Molecules' },
  { id: 'organisms', name: 'Organisms' }
];

// Sample data
const tagColors = [
  '#fecaca', '#fed7aa', '#fef3c7', '#d9f99d', '#a7f3d0',
  '#a5f3fc', '#bfdbfe', '#c4b5fd', '#f0abfc', '#e5e7eb'
];

const commonIcons = [
  'edit', 'delete', 'add', 'search', 'filter',
  'calendar', 'clock', 'document', 'clipboard',
  'menu', 'close', 'check', 'warning', 'info'
];

const sampleTasks: Record<string, TaskResponse> = {
  pending: {
    id: 1,
    title: '完成專案文件',
    tags: [
      { id: 1, name: '工作', color: '#fecaca' },
      { id: 2, name: '重要', color: '#fed7aa' }
    ],
    dueTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    note: '需要完成所有的技術文件和使用者手冊',
    status: 'PENDING' as const
  },
  completed: {
    id: 2,
    title: '設計系統建立',
    tags: [
      { id: 3, name: '設計', color: '#d9f99d' }
    ],
    completedAt: new Date().toISOString(),
    note: '建立完整的設計系統和元件庫',
    status: 'COMPLETE' as const
  },
  withDueDate: {
    id: 3,
    title: '逾期任務示例',
    tags: [],
    dueTime: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    note: '這是一個逾期的任務示例',
    status: 'PENDING' as const
  }
};

// Methods
const shouldShowCategory = (category: string) => {
  return selectedCategory.value === 'all' || selectedCategory.value === category;
};

const showModal = (size: 'sm' | 'md' | 'lg' | 'xl') => {
  currentModal.value = {
    show: true,
    title: `${size.toUpperCase()} 彈窗`,
    size
  };
};
</script> 