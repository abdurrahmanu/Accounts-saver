 <template>
  <header class="sm:text-left py-5 shadow px-2 w-full bg-white flex items-center justify-between h-fit">
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
        <button @click="navigateTo('/accounts')" class="text-xs ring-slate-400 cursor-pointer flex items-center gap-2 justify-self-end ring rounded-md hover:bg-slate-200 w-fit px-2 h-fit py-1">
          Close Form
          <div>
            <SvgMinus class="w-4"/>
          </div>
      </button>
    </div>

    <div v-if="route.fullPath.includes('accounts') && !route.fullPath.includes('/addAccount')">
        <button @click="addAccountFn" class="text-xs ring-slate-400 cursor-pointer flex items-center gap-2 justify-self-end ring rounded-md hover:bg-slate-200 w-fit px-2 h-fit py-1">
          Add Account
          <div>
            <SvgPlus class="w-4"/>
          </div>
        </button>
    </div>

    <div v-if="route.fullPath.includes('/collections') && !route.fullPath.includes('addCollection')">
        <button @click="addCollectionFn" class="text-xs ring-slate-400 cursor-pointer flex items-center gap-2 justify-self-end ring rounded-md hover:bg-slate-200 w-fit px-2 h-fit py-1">
          Add Collection
          <div>
            <SvgPlus class="w-4"/>
          </div>
        </button>
    </div>
      
    <div v-if="route.fullPath === '/collections/addCollection'">
        <button @click="navigateTo('/collections')" class="text-xs px-2 py-1 hover:slate-300 cursor-pointer ring ring-slate-400 flex items-center gap-2 rounded-md">
            Close Form
            <div>
              <SvgMinus class="w-4"/>
          </div>
        </button>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()

const addAccountFn = () => {
  navigateTo('/accounts/addAccount')
}

const addCollectionFn = () => {
  navigateTo('/collections/addCollection')
}
</script>