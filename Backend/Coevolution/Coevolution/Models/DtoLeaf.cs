﻿using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Coevolution.Models
{
    //DTO for leaf items
    public class DtoLeaf : DtoItem
    {
        /// <summary>
        /// Value of the property defined by the key
        /// </summary>
        public string Value { get; set; }
        /// <summary>
        /// Boolean to mark whether this leaf is stale
        /// </summary>
        public bool Stale { get; set; }

        public DtoLeaf()
            : base()
        {

        }

        //Dto to domain object
        public override Item ToDomainObject(Node parent)
        {
            var newLeaf = new Leaf()
            {
                Key = this.Key,
                Parent = parent,
                Deleted = this.Deleted,
                Value = this.Value,
                Notes = DtoNote.DtoNoteListToDomainObjecs(this.Notes),
                Stale = this.Stale,
                //CreatedOn = DateTime.Parse(this.CreatedOn, null, System.Globalization.DateTimeStyles.RoundtripKind),
                //UpdatedOn = DateTime.Parse(this.UpdatedOn, null, System.Globalization.DateTimeStyles.RoundtripKind)

            };

            if (parent == null)
            {
                throw new InvalidDataException("Leaf must have a parent."); // TODO: Throw 4XX rather than 5XX
            }

            return newLeaf;
        }
    }
}