
<div className="container">
  <label> ID:</label>
  <input
    type="text"
    value={idPost}
    onChange={(e) => setIdPost(e.target.value)}
  />
  <label> Titulo:</label>
  <textarea
    type="text"
    value={titulo}
    onChange={(e) => setTitulo(e.target.value)}
  ></textarea>
  <label> Autor:</label>
  <input
    type="text"
    value={autor}
    onChange={(e) => setAutor(e.target.value)}
  />
  <br /> <br />
  <button onClick={handleAdd}> Cadastrar</button>
  <button onClick={buscarPost}> Buscar postagem</button>
  <button onClick={editarPost}> Editar</button> <br /> <br />
  <ul>
    {posts.map((item) => {
      return (
        <li key={item.id}>
          <span> Id: {item.id}</span>
          <span>Titulo: {item.titulo}</span>
          <span>Autor: {item.autor}</span>
          <button onClick={() => excluirPost(item.id)}>
            {" "}
            Excluir post{" "}
          </button>{" "}
          <br /> <br />
        </li>
      );
    })}
  </ul>
</div>

// excluir post

async function excluirPost(id) {
  await firebase
    .firestore()
    .collection("posts")
    .doc(id)
    .delete()
    .then(() => {
      Alert("Esse post foi excluido");
    });
}
  
  // excluir post /

  // editar post

  async function editarPost() {
    await firebase
      .firestore()
      .collection("posts")
      .doc(idPost)
      .update({
        titulo: titulo,
        autor: autor,
      })

      .then(() => {
        console.log("dadtos atualizados");
        setIdPost("");
        setTitulo("");
        setAutor("");
      })
      .catch(() => {
        console.log("error ao atualizar.");
      });
  }

 
  // editar post /

  // busscar post
  
  async function buscarPost() {
    /* 
    await firebase.firestore().collection("posts")
      .doc("123")
      .get()
      .then((snapshot) => {
        setTitulo(snapshot.data().titulo);
        setAutor(snapshot.data().autor);
      })
    
      .catch(() => {
      console.log("Deu algum erro")
    }) */

    await firebase
      .firestore()
      .collection("posts")
      .get()
      .then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          });
        });

        setPosts(lista);
      })
      .catch(() => {
        console.log("Deu um erro");
      });
}
  
// buscar post/

// handleAdd

async function handleAdd() {
  await firebase
    .firestore()
    .collection("posts")
    .add({
      titulo: titulo,
      autor: autor,
    })

    .then(() => {
      console.log("Dados cadastrados");

      setTitulo("");
      setAutor("");
    })
    .catch((error) => {
      console.log(error);
    });
}
// handleAdd/

// userEffect
useEffect(() => {
  async function loadPosts() {
    await firebase
      .firestore()
      .collection("posts")
      .onSnapshot((doc) => {
        let meusPosts = [];

        doc.forEach((item) => {
          meusPosts.push({
            id: item.id,
            titulo: item.data().titulo,
            autor: item.data().autor,
          });
        });

        setPosts(meusPosts);
      });
  }

  loadPosts();
}, []);

useEffect(() => {
  async function checkLogin() {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //  possui usuario logado
        setUser(true);
        setUserLogged({
          uid: user.uid,
          email: user.email
        })
      }
      else {
        // não possui usuario logado
        setUser(false);
        setUserLogged({})
      }
    })
  }

  checkLogin();
}, []);
// userEfect/

//fazerlogin

async function fazerLogin() {
  await firebase.auth().signInWithEmailAndPassword(email, senha)
    .then((value) => {
    console.log(value)
    })
    .catch((error) => {
    console.log(`error ao fazer login ${error}`)
  })
}

//fazer login/