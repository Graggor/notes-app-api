# Server
## Notes
- [x] Get all notes by userID (including notes shared with userID?)  
- [x] Get single note info (example, you shared a note with someone.  
- [x] Create new note  
- [x] Delete note  
- [x] Update note contents (notebook _id, title, content) 
- [ ] Add tags to notes.

## Notebooks
- [ ] Get all notebooks from the user  
- [ ] Get all notes that are contained in specific notebook  
- [ ] Create new notebook  
- [ ] Update notebook information  
- [ ] Delete notebook (also deleted all the notes in said notebook.)  

## Users
- [x] Register  
- [x] Login (currently returns a JWT, session would be safer.)  

# Frontend
## User  
- [ ] Show login screen  
- [ ] Allow user to login  
- [ ] Get session info, put in cookie and save it.  

## After Login
- [ ] Call /notebooks, get all notebooks from user  
- [ ] Call /notes, get all notes from user  
- [ ] Show Notebooks on side  
- [ ] Expand Notebooks and show Notes in said notebook  

## After click on Notebook
- [ ] Show title and contents of notebook
- [ ] Title editable  
- [ ] Content editable  
- [ ] Content rendered like bear.app (example: show all the markdown, # rendered in `<H1>` tag)  
- [ ] Saves after stop typing for X seconds.  
- [ ] Tags at bottom of the screen  
- [ ] Tags autocomplete  
- [ ] Custom links in text, autocomplete to different notes.  
