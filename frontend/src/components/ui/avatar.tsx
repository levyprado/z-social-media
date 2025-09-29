type AvatarProps = {
  img: string | null
}

export default function Avatar({ img }: AvatarProps) {
  return (
    <div className='aspect-square size-10 shrink-0 overflow-hidden rounded-full'>
      {img ? (
        <img src={img} className='size-full object-cover' />
      ) : (
        <div className='bg-primary size-full' />
      )}
    </div>
  )
}
