import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'
import ProfileForm from './profile-form'

export default function EditProfileDialog() {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => (
          <Button variant='outline' {...props}>
            Edit profile
          </Button>
        )}
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile</DialogDescription>
        </DialogHeader>

        <ProfileForm onClose={close} />
      </DialogContent>
    </Dialog>
  )
}
