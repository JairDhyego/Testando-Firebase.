import { useState } from "react";
import firebase from "./firebaseConection";
import { React } from "react";
import "./styled.css";

function App() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cargo, setCargo] = useState("");
  const [nome, setNome] = useState("");

  const [user, setUser] = useState({})



  async function novoUsuario() {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, senha)
      .then(async (value) => {
        await firebase.firestore().collection("users")
          .doc(value.user.uid)
          .set({
            nome: nome,
            cargo: cargo,
            status: true,

          })

          .then(() => {
            setNome("");
            setSenha("");
            setCargo("");
            setEmail("");
          })
      })
      .catch((error) => {
        if (error.code === "auth/weak-password") {
          alert("sennha muito fraca.");
        } else if (error.code === "auth/email-already-in-use") {
          alert("Esse email já está em uso.");
        }
      });
  }

  async function logout() {
    await firebase.auth().signOut();
  }


  async function login() {
    await firebase.auth().signInWithEmailAndPassword(email, senha)
      .then(async (value) => {
        await firebase.firestore().collection("users")
          .doc(value.user.uid)
          .get()
          .then((snapshot) => {
            setUser({
              nome: snapshot.data().nome,
              cargo: snapshot.data().cargo,
              email: value.user.email
            });

          })


      })
    
      .catch((error) => {
      console.log(`error: ${error}`)
    })
  }




  return (
    <div className="main">
      <div className="container">
        <h2>Firebase teste</h2> <br />


        <label>Nome:</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        <br />

        <label>Cargo:</label>
        <input type="text" value={cargo} onChange={(e) => setCargo(e.target.value)} />
        <br />

        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />


        <label>Senha:</label>
        <input type="text" value={senha} onChange={(e) => setSenha(e.target.value)} />
        <br />

        <button onClick={login}>Fazer login</button>
        <button onClick={novoUsuario}> Cadastrar</button>
        <button onClick={logout}>Sair da conta!</button>
      </div>

      <hr />  <br />

      {Object.keys(user).length > 0 && (
        <div>
          <strong>Olá</strong> {user.nome} <br />
          <strong>Cargo:</strong> {user.cargo} <br />
          <strong>Email:</strong> {user.email} <br />
          <strong>Status:</strong> {user.status ? "Ativo" : "Desativado"}  <br />

        </div>
      )}


    </div>
  );
}

export default App;
