'use client'

type Props = {
  width: number | ''
  profile: number | ''
  rim: number | ''
  widths: number[]
  profiles: number[]
  rims: number[]
  onChange: (filters: {
    width: number | ''
    profile: number | ''
    rim: number | ''
  }) => void
}

export default function ProductFilters({
  width,
  profile,
  rim,
  widths,
  profiles,
  rims,
  onChange
}: Props) {
  return (
    <div className="product-filters">
      <select
        value={width}
        onChange={e =>
          onChange({
            width: e.target.value ? Number(e.target.value) : '',
            profile,
            rim
          })
        }
      >
        <option value="">Ancho</option>
        {widths.map(w => (
          <option key={w} value={w}>{w}</option>
        ))}
      </select>

      <select
        value={profile}
        onChange={e =>
          onChange({
            width,
            profile: e.target.value ? Number(e.target.value) : '',
            rim
          })
        }
      >
        <option value="">Perfil</option>
        {profiles.map(p => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>

      <select
        value={rim}
        onChange={e =>
          onChange({
            width,
            profile,
            rim: e.target.value ? Number(e.target.value) : ''
          })
        }
      >
        <option value="">Aro</option>
        {rims.map(r => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>
    </div>
  )
}