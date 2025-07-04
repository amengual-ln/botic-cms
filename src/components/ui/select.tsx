import React from 'react'

type SelectProps = Omit<React.ComponentProps<'select'>, 'onChange' | 'value'> & {
  onValueChange?: (value: string) => void
  value?: string
}

export function Select({ children, onValueChange, value, ...props }: SelectProps) {
  return (
    <select
      {...props}
      value={value ?? ''}
      onChange={(e) => {
        onValueChange?.(e.target.value)
      }}
    >
      {children}
    </select>
  )
}

export const SelectTrigger = ({ children, ...props }: React.ComponentProps<'div'>) => (
  <div {...props}>{children}</div>
)

export const SelectValue = ({ children, ...props }: React.ComponentProps<'span'>) => (
  <span {...props}>{children}</span>
)

export const SelectContent = ({ children, ...props }: React.ComponentProps<'div'>) => (
  <div {...props}>{children}</div>
)

export const SelectItem = ({ children, ...props }: React.ComponentProps<'div'>) => (
  <div {...props}>{children}</div>
)
