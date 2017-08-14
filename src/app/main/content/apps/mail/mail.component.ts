import { Component, OnDestroy, OnInit } from '@angular/core';
import { MailService } from './mail.service';
import { Subscription } from 'rxjs/Subscription';
import { FormControl } from '@angular/forms';

@Component({
    selector   : 'fuse-mail',
    templateUrl: './mail.component.html',
    styleUrls  : ['./mail.component.scss']
})
export class MailComponent implements OnInit, OnDestroy
{
    hasSelectedMails: boolean;
    isIndeterminate: boolean;
    folders: any[];
    filters: any[];
    labels: any[];
    searchInput: FormControl;

    onSelectedMailsChanged: Subscription;
    onFoldersChanged: Subscription;
    onFiltersChanged: Subscription;
    onLabelsChanged: Subscription;

    constructor(private mailService: MailService)
    {
        this.searchInput = new FormControl('');
    }

    ngOnInit()
    {
        this.onSelectedMailsChanged =
            this.mailService.onSelectedMailsChanged
                .subscribe(selectedMails => {

                    setTimeout(() => {
                        this.hasSelectedMails = selectedMails.length > 0;
                        this.isIndeterminate = (selectedMails.length !== this.mailService.mails.length && selectedMails.length > 0);
                    }, 0);
                });

        this.onFoldersChanged =
            this.mailService.onFoldersChanged
                .subscribe(folders => {
                    this.folders = this.mailService.folders;
                });

        this.onFiltersChanged =
            this.mailService.onFiltersChanged
                .subscribe(folders => {
                    this.filters = this.mailService.filters;
                });

        this.onLabelsChanged =
            this.mailService.onLabelsChanged
                .subscribe(labels => {
                    this.labels = this.mailService.labels;
                });


        /*this.searchInput.valueChanges
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(searchText => {
                this.mailService.onSearchTextChanged.next(searchText);
            });*/
    }

    ngOnDestroy()
    {
        this.onSelectedMailsChanged.unsubscribe();
        this.onFoldersChanged.unsubscribe();
        this.onFiltersChanged.unsubscribe();
        this.onLabelsChanged.unsubscribe();
    }

    toggleSelectAll()
    {
        this.mailService.toggleSelectAll();
    }

    selectMails(filterParameter?, filterValue?)
    {
        this.mailService.selectMails(filterParameter, filterValue);
    }

    deselectMails()
    {
        this.mailService.deselectMails();
    }

    toggleLabelOnSelectedMails(labelId)
    {
        this.mailService.toggleLabelOnSelectedMails(labelId);
    }

    setFolderOnSelectedMails(folderId)
    {
        this.mailService.setFolderOnSelectedMails(folderId);
    }
}
