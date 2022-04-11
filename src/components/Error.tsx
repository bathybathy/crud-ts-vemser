import React from 'react'
import Notiflix from 'notiflix'

function Error() {

    function erro (){
        Notiflix.Report.failure(
            "Erro",
            "Houve algum erro na sua solicitação.",
            "Por favor, tente novamente."
        )
    }
  return (
      <>
    {erro()}
    </>
  )
}

export default Error