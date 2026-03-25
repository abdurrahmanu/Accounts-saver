 <template>
  <header class="sm:text-left py-5 shadow px-2 w-full bg-white flex items-center justify-between">
    <div>
      <div class="flex items-center gap-1 top-1 text-xs font-bold">
        <SvgLogo class="w-10 rotate-12 relative -top-1"/>
        <div>  
          <p>ACCOUNTS MANAGER</p>
          <p class="text-gray-500 font-medium text-[10px] text-sm">Easily manage your accounts.</p>
        </div>
      </div>
    </div>

    <div v-if="route.fullPath === '/accounts/addAccount'">
      <NuxtLink to="/accounts">
        <button @click="$router.back(), toggleAddAccountForm" class="text-xs ring-slate-400 cursor-pointer flex items-center gap-2 justify-self-end ring rounded-md hover:bg-slate-200 w-fit px-2 h-fit py-1">
          Close Form
          <div>
            <SvgMinus class="w-4"/>
          </div>
      </button>
    </NuxtLink>
    </div>

    <div v-if="route.fullPath === '/accounts'">
      <NuxtLink to="/accounts/addAccount">
        <button @click="toggleAddAccountForm" class="text-xs ring-slate-400 cursor-pointer flex items-center gap-2 justify-self-end ring rounded-md hover:bg-slate-200 w-fit px-2 h-fit py-1">
          Add Account
          <div>
            <SvgPlus class="w-4"/>
          </div>
        </button>
      </NuxtLink>
    </div>

    <div v-if="route.fullPath.includes('/collections') && !route.fullPath.includes('addCollection')">
      <NuxtLink to="/collections/addCollection">
        <button @click="toggleAddAccountForm" class="text-xs ring-slate-400 cursor-pointer flex items-center gap-2 justify-self-end ring rounded-md hover:bg-slate-200 w-fit px-2 h-fit py-1">
          Add Collection
          <div>
            <SvgPlus class="w-4"/>
          </div>
        </button>
      </NuxtLink>
    </div>
      
    <div v-if="route.fullPath === '/collections/addCollection'">
      <NuxtLink to="/collections">
        <button @click="$router.back(), toggleAddCollectionForm" class="text-xs px-2 py-1 hover:slate-300 cursor-pointer ring ring-slate-400 flex items-center gap-2 rounded-md">
            Close Form
            <div>
                <SvgMinus class="w-4"/>
            </div>
          </button>
      </NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()

const accountStore = useAccountStore()
const {addNewAccount} = storeToRefs(accountStore)

const collectionStore = useCollectionStore()
const {toggleCollectionForm} = storeToRefs(collectionStore)

const selectStore = useSelectStore()
const {cancel} = selectStore

const toggleAddAccountForm = () => {
  cancel()
  addNewAccount.value = !addNewAccount.value
  toggleCollectionForm.value = false
}

const toggleAddCollectionForm = () => {
  cancel()
  toggleCollectionForm.value = !toggleCollectionForm.value
  addNewAccount.value = false
}
</script>