import { CircleNotch, IconProps } from "phosphor-react"

interface LoadingHOCProps {
  Component(): JSX.Element,
  loading: boolean,
  iconProps?: IconProps
}

export function LoadingHOC({ Component, loading, iconProps }: LoadingHOCProps) {
  return loading ? (
    <CircleNotch
      size={27}
      fill='#FFF'
      {...iconProps}
      className='animate-spin'
    />
  ) : <Component />
}
