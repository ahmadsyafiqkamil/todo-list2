// import { http, 
//     createConfig, 
//     cookieStorage, 
//     createStorage 
// } from 'wagmi'
// import { mainnet, sepolia } from 'wagmi/chains'

// export const config = createConfig({
//   chains: [mainnet, sepolia],
//   ssr: true,
  // storage: createStorage({
  //   storage: cookieStorage,
  // }),
//   transports: {
//     [mainnet.id]: http(),
//     [sepolia.id]: http(),
//   },
// })

// wagmi.config.ts
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { createStorage, cookieStorage } from 'wagmi'
import { sepolia } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'Web3 Notes',
  projectId: '963318628f4dc417f350517c4399d235', // 👉 daftar gratis di https://cloud.walletconnect.com
  chains: [sepolia],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
   }),
})
