<template>
    <section class="mb-2 flex text-gray-700 justify-end">
        <div class="bg-gray-50 px-2 py-1.5 shadow-sm w-32 border-b border-pink-500">
            <p class="text-sm text-gray-400 leading-none mb-2 flex justify-between">
                <span>
                    Umumiy
                </span>
                <i class="fa-light fa-sigma text-pink-600"></i>
            </p>
            <div class="leading-none font-semibold">
                {{+sale.Summa.cash + +sale.Summa.debt + +sale.Summa.electron }}
            </div>
        </div>
        <div class="h-full border-l mx-8"></div>
        <div class="bg-gray-50 px-2 py-1.5 shadow-sm rounded w-32">
            <p class="text-sm text-gray-400 leading-none mb-2 flex justify-between">
                <span>
                    Naxt
                </span>
                <i class="fa-light fa-sack-dollar text-teal-600"></i>
            </p>
            <div class="leading-none font-semibold">
                {{ sale.Summa.cash }}
            </div>
        </div>
        <div class="bg-gray-50 px-2 py-1.5 shadow-sm rounded w-32 mx-6">
            <p class="text-sm text-gray-400 leading-none mb-2 flex justify-between">
                <span>
                    Plastik
                </span>
                <i class="fa-light fa-money-check-dollar text-sky-600"></i>
            </p>
            <div class="leading-none font-semibold">
                {{ sale.Summa.electron }}
            </div>
        </div>
        <div class="bg-gray-50 px-2 py-1.5 shadow-sm rounded w-32">
            <p class="text-sm text-gray-400 leading-none mb-2 flex justify-between">
                <span>
                    Qarz
                </span>
                <i class="fa-light fa-money-check-dollar-pen text-pink-600"></i>
            </p>
            <div class="leading-none font-semibold">
                {{ sale.Summa.debt }}
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { sumSale } from '@/store/useSumSaleStore'
const sale = sumSale()
sale.getDayInfo()
</script>