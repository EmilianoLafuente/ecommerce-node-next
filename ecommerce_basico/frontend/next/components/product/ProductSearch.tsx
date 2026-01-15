'use client'

type Props = {
  value: string
  onChange: (value: string) => void
}

export default function ProductSearch({ value, onChange }: Props) {
  return (
    <div className="product-search">
      <input
        type="text"
        placeholder="Buscar por marca o modelo..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}