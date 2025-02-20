import { useCallback, useEffect, useMemo, useState, useTransition } from "react"
import { AppForm, Button, TextInput, Loading } from "../../component"
import { FcGoogle } from "react-icons/fc"
import alertStore from "../../zustand/alertStore"
import toastStore from "../../zustand/toastStore"
import { emailValidator, getCreatedAt, passwordValidator } from "../../utils"
import { auth, authService, dbService, FBCollection } from "../../lib"
import { useAuth, useNavi } from "../../hooks"

const Login = () => {
  const [isPending, startTransition] = useTransition()
  const navi = useNavi()
  const { user, fetchUser } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const emailMessage = useMemo(() => emailValidator(email), [email])
  const passwordMessage = useMemo(() => passwordValidator(password), [password])

  const Email = TextInput()
  const Password = TextInput()

  const { alert } = alertStore()
  const { toast } = toastStore()

  const onSuccess = useCallback(() => {
    navi("my")
  }, [navi])

  const onSignup = useCallback(() => {
    if (emailMessage) {
      return alert(emailMessage, [{ onPress: Email.focus }])
    }

    if (passwordMessage) {
      return alert(passwordMessage, [{ onPress: Password.focus }])
    }

    startTransition(async () => {
      try {
        const res = await authService.createUserWithEmailAndPassword(
          email,
          password
        )

        if (res && res.user) {
          const newUser: User = {
            email,
            uid: res.user.uid,
            name: null,
            createdAt: getCreatedAt(),
          }
          await dbService
            .collection(FBCollection.USERS)
            .doc(res.user.uid)
            .set(newUser)

          fetchUser(newUser)
          toast({
            type: "Success",
            message: "안녕하세요!",
            onPress: onSuccess,
          })
        }
      } catch (error: any) {
        return toast({ message: error.message, type: "Error" })
      }
    })
  }, [
    email,
    password,
    emailMessage,
    passwordMessage,
    Email,
    Password,
    toast,
    alert,
    onSuccess,
    fetchUser,
  ])

  const onSubmit = useCallback(() => {
    if (emailMessage) {
      return alert(emailMessage, [{ onPress: Email.focus }])
    }

    if (passwordMessage) {
      return alert(passwordMessage, [{ onPress: Password.focus }])
    }

    startTransition(async () => {
      try {
        await authService.signInWithEmailAndPassword(email, password)
        toast({
          type: "Success",
          message: "안녕하세요!",
          onPress: onSuccess,
        })
      } catch (error: any) {
        switch (error.message) {
          case "Firebase: The supplied auth credential is incorrect, malformed or has expired. (auth/invalid-credential).":
            return alert("가입되지 않은 계정입니다. 회원가입 하시겠습니까?", [
              {
                onPress: onSignup,
                text: "회원가입",
              },
              { text: "취소" },
            ])
          default:
            return toast({ message: error.message, type: "Error" })
        }
      }
    })
  }, [
    Email,
    Password,
    emailMessage,
    passwordMessage,
    toast,
    alert,
    email,
    password,
    onSignup,
    onSuccess,
  ])

  const onGoogle = useCallback(() => {
    startTransition(async () => {
      try {
        const provider = new auth.GoogleAuthProvider()
        const res = await authService.signInWithPopup(provider)
        if (res && res.user) {
          const newUser: User = {
            email: res.user.email!,
            uid: res.user.uid,
            name: null,
            createdAt: getCreatedAt(),
          }

          await dbService
            .collection(FBCollection.USERS)
            .doc(res.user.uid)
            .set(newUser)

          fetchUser(newUser)

          toast({
            type: "Success",
            message: "환영합니다!",
            onPress: onSuccess,
          })
        }
      } catch (error: any) {
        return toast({ type: "Error", message: error.message })
      }
    })
  }, [toast, onSuccess])

  useEffect(() => {
    setTimeout(() => {
      Email.focus()
    }, 300)
  }, [])

  return (
    <div>
      {isPending && <Loading />}
      <AppForm className="p-8 gap-y-4" onSubmit={onSubmit}>
        <h1 className="text-2xl font-black text-gray-600">Login</h1>
        <Email.Component
          title="이메일"
          placeholder="YourEmail@email.com"
          type="email"
          onChangeText={setEmail}
          value={email}
        />
        <Password.Component
          title="비밀번호"
          placeholder="* * * * * * * *"
          type="password"
          onChangeText={setPassword}
          value={password}
        />
        <Button.Submit>로그인</Button.Submit>
        <Button.Simple
          type="button"
          className="gap-x-2.5 mt-5"
          onClick={onGoogle}
        >
          <FcGoogle className="text-xl" /> Continue with Google
        </Button.Simple>
        <Button.Simple type="button" onClick={onSignup}>
          회원가입
        </Button.Simple>
      </AppForm>
    </div>
  )
}

export default Login
