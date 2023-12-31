'use client'

import { SessionProvider } from 'next-auth/react'
import {FC, ReactNode} from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
interface ProviderProps {
    children: ReactNode;
}

export const Provider: FC<ProviderProps> = ({children}) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

const queryClient = new QueryClient();
export const QueryProvider: FC<ProviderProps> = ({children}) => {
  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}