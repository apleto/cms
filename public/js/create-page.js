$('#page-title').on('keyup', () => {
  let title = $('#page-title').val().toLowerCase();
  
  let id = title.split(' ').join('-');

  $('#page-id').val(id);
});

var newSectionEditor;

const loadNewSectionEditor = async () => {
  newSectionEditor = CodeMirror(document.getElementById('new-section-editor'), {
    value: "// Your code here\n",
    mode:  "pug",
    indentUnit: 2,
    //smartIndent: true,
    lineNumbers: true
  
  });  

  return;
}



$( document ).ready( async () => {

  $('#new-custom-content-editor').hide();


  $('#create-page-form').on('submit', async (e) => {
    e.preventDefault();
  
    let pageData = $('#create-page-form').serializeJSON();
    const user = client.get('user')
    pageData.metadata = {
      description: null,
      author: user._id,
      keywords: null
    }

    pageData.allow_comments = true;
    pageData.require_auth_to_comment = true;

    pageData.tags = [];

    pageData.published_on = null;
    pageData.published = false;

    pageData.status = 'Draft'

    const page = await client.service('api/pages').create(pageData);

    let version = pageData;

    version.page = page._id;

    const pageVersion = await client.service('api/page-versions').create(version);

    await client.service('api/pages').patch(page._id, { version: pageVersion._id});

    
    window.location.href=`/admin/content/pages/edit/${page._id}`;

  });

});

$('#section-type').on('change', async () => {
  const type = $('#section-type').val();
  if( type == 'custom') {
    $('#new-custom-content-editor').show();
    await loadNewSectionEditor()
  } else {
    $('#new-custom-content-editor').hide();
  }
});