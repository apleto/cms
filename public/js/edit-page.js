const NewSection = {
  
}

let newSectionEditor = null;

const addSectionBtn = $('#add-section-button');
const deleteSectionBtn = $('.delete-section');
const sectionOrder = $('.section-order');
const moveSectionDownBtn = $('.move-section-down');
const addSectionForm = $('#add-section-form');

const loadNewSectionEditor = async () => {
  newSectionEditor = CodeMirror(document.getElementById('new-section-editor'), {
    value: "// Your code here\n",
    mode:  "jade",
    indentUnit: 2,
    smartIndent: false,
    lineNumbers: true
  
  });  

  return;
}


$( document ).ready( async () => {

  $('#new-custom-content-editor').hide();

  $('#page-title').on('keyup', () => {
    let title = $('#page-title').val().toLowerCase();
    
    //let id = title.split(' ').join('-');
  
    $('#page-id').val(id);
  });

  $('#section-type').on('change', async () => {
    const type = $('#section-type').val();
    if( type == 'new-content-block') {
      $('#new-section-content-block').hide();
      $('#new-custom-content-editor').show();
      $('#section-order').show();
      if(!newSectionEditor)
        await loadNewSectionEditor();
      
    }

    if( type == 'content-block') {
      $('#new-section-content-block').show();
      $('#section-order').show();
    }
  });

  $('#add-section-form').on('submit', async (e) => {
    e.preventDefault();

    const sectionData = $('#add-section-form').serializeJSON();
    sectionData.page = $('#page-id').val();
    console.log(sectionData)
    try {
      client.service('api/page-sections').create(sectionData)
      .then( async response => {
        const successMessage = 'The section was added to the page.'

        $('.alert-success').show();
        $('#success-message').html(successMessage);

        window.location.href = window.location.pathname;
      });
    }
    catch (error) {
      const errorMessage = 'There was an issue adding the section to the page.'

      $('.alert-danger').show();
      $('#error-message').html(errorMessage);
    }

  });

  

  addSectionBtn.on('click', async () => {
    addSectionBtn.hide();
    addSectionForm.show();
  });


  deleteSectionBtn.on('click', async (e) => {
    const id = e.currentTarget.attributes['data-section-id'].value;

    await client.service('api/page-sections').remove(id);

    $(`li#${id}`).hide();
  });



  sectionOrder.on('change', async (e) => {
    const id = e.currentTarget.attributes['id'].value;

    const order = e.currentTarget.value;

    try {
      client.service('api/page-sections').patch(id, { display_order: order })
    }
    catch (error) {
      console.log(error)
    }

    // $(`li#${id}`).hide();
  });
});

