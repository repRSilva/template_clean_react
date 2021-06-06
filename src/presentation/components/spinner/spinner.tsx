import React from 'react'
import Styles from './spinner-styles.scss'

type Props = React.HtmlHTMLAttributes<HTMLElement> & {
  isNegative?: boolean
}

const Spinner: React.FC<Props> = ({ isNegative, ...props }: Props) => {
  const negativeClass = isNegative ? Styles.negative : ''
  return (
    <div {...props} data-testid="spinner" className={[Styles.spinner, negativeClass].join(' ')}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Spinner
