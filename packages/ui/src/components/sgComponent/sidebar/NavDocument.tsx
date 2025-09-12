'use client';

import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';
import {  SidebarGroup, SidebarMenu, SidebarMenuItem, useSidebar } from '../../ui/sidebar';
import { Clock, LucideIcon, Mail, MessageCircle, Phone, X } from 'lucide-react';

export function NavDocuments() {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden my-auto">
      <SidebarMenu>
        <SidebarMenuItem>
          <Card className="">
            <CardContent className="p-4 ">
              <div className="space-y-3">
                <div className="text-center">
                  <h3 className="font-semibold text-sm text-foreground">Besoin d'aide ?</h3>
                  <p className="text-xs text-muted-foreground mt-1">Notre équipe est là pour vous</p>
                </div>

                <div className="space-y-2">
                  {[
                    {
                      type: 'phone',
                      label: 'Appeler',
                      value: '01 81 69 58 85',
                      icon: Phone,
                      primary: true,
                    },
                    {
                      type: 'email',
                      label: 'Email',
                      value: 'hello@smart-garant.com',
                      icon: Mail,
                      primary: false,
                    },
                  ].map((contact) => (
                    <Button
                      key={contact.type}
                      variant={contact.primary ? 'default' : 'outline'}
                      size="sm"
                      className="w-full justify-start gap-2 h-auto py-2"
                      asChild
                    >
                      <a
                        href={
                          contact.type === 'phone'
                            ? `tel:${contact.value.replace(/\s/g, '')}`
                            : contact.type === 'email'
                              ? `mailto:${contact.value}`
                              : '#'
                        }
                      >
                        <contact.icon className="h-3.5 w-3.5" />
                        <div className="flex flex-col items-start">
                          <span className="text-xs font-medium">{contact.label}</span>
                          <span className="text-xs opacity-80">{contact.value}</span>
                        </div>
                      </a>
                    </Button>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-1 pt-2 border-t">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Lun-Ven 09:00–13:00 / 14:00–18:00</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
