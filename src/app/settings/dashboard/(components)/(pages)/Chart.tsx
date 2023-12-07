import React, { useMemo } from "react"
import css from "../style.module.scss"
import {
  Chart as Chartjs,
  ChartData,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js"
import { useStoreselector } from "@/lib/redux/store"
import { Pie } from "react-chartjs-2"

type Props = {
  id: string
}

Chartjs.register(ArcElement, Tooltip, Legend)

const Chart = ({ id }: Props) => {
  const item_data = useStoreselector((state) => state.users.data)

  const data = useMemo(() => {
    if (item_data != null) {
      const arr = [
        item_data.cart != null ? item_data.cart.length : 0,
        item_data.sold_items != null ? item_data.sold_items.length : 0,
        item_data.items?.find((i) => i.id === id)?.whishlist_id?.length ?? 0,
      ]
      const dataset: ChartData<"pie", number[], unknown> = {
        labels: ["Cart", "Ordered", "Whishlist"],
        datasets: [
          {
            data: arr.map((val) => Math.max(val!, 0.1)),
            backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56"],
          },
        ],
      }
      return dataset
    } else
      return {
        labels: ["Cart", "Ordered", "Whishlist"],
        datasets: [
          {
            data: [0.1, 0.1, 0.1],
            backgroundColor: ["#CB4335", "36A2EB", "#FFCD56"],
          },
        ],
      }
  }, [item_data, id])

  return (
    <main className={css.chart_page}>
      <div style={{ width: "30rem" }}>
        <h1>Ratio Chart:</h1>
        <Pie
          data={data}
          options={{
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => {
                    return `${context.parsed < 1 ? 0 : context.parsed}`
                  },
                },
              },
              legend: {
                onHover(evt, item, legend) {
                  const arr = legend.chart.data.datasets[0]
                    .backgroundColor as string[]
                  arr.forEach((color, index, colors) => {
                    colors[index] =
                      index === item.index || color.length === 9
                        ? color
                        : color + "4D"
                  })
                  legend.chart.update()
                },
                onLeave(evt, item, legend) {
                  const arr = legend.chart.data.datasets[0]
                    .backgroundColor as string[]
                  arr.forEach((color, index, colors) => {
                    colors[index] =
                      color.length === 9 ? color.slice(0, -2) : color
                    console.log(arr)
                  })
                  legend.chart.update()
                },
              },
            },
          }}
        />
      </div>
    </main>
  )
}

export default Chart
